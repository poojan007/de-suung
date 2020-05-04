import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { ApiModel } from '../model/api-model';
import { LoadingController, NavController, Platform, AlertController } from '@ionic/angular';
import { ApiService } from '../services/api.service';
import { NativeGeocoder, NativeGeocoderOptions, NativeGeocoderResult } from '@ionic-native/native-geocoder/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { Geomodel } from '../model/geomodel';
import { BarcodeScanner, BarcodeScannerOptions } from '@ionic-native/barcode-scanner/ngx';
import { Qrmodel } from '../model/qrmodel';
import { Subscription, BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

  slideOpts = {
    on: {
      beforeInit() {
        const swiper = this;
        swiper.classNames.push(`${swiper.params.containerModifierClass}fade`);
        const overwriteParams = {
          slidesPerView: 1,
          slidesPerColumn: 1,
          slidesPerGroup: 1,
          watchSlidesProgress: true,
          spaceBetween: 0,
          virtualTranslate: true,
        };
        swiper.params = Object.assign(swiper.params, overwriteParams);
        swiper.params = Object.assign(swiper.originalParams, overwriteParams);
      },
      setTranslate() {
        const swiper = this;
        const { slides } = swiper;
        for (let i = 0; i < slides.length; i += 1) {
          const $slideEl = swiper.slides.eq(i);
          const offset$$1 = $slideEl[0].swiperSlideOffset;
          let tx = -offset$$1;
          if (!swiper.params.virtualTranslate) { tx -= swiper.translate; }
          let ty = 0;
          if (!swiper.isHorizontal()) {
            ty = tx;
            tx = 0;
          }
          const slideOpacity = swiper.params.fadeEffect.crossFade
            ? Math.max(1 - Math.abs($slideEl[0].progress), 0)
            : 1 + Math.min(Math.max($slideEl[0].progress, -1), 0);
          $slideEl
            .css({
              opacity: slideOpacity,
            })
            .transform(`translate3d(${tx}px, ${ty}px, 0px)`);
        }
      },
      setTransition(duration) {
        const swiper = this;
        const { slides, $wrapperEl } = swiper;
        slides.transition(duration);
        if (swiper.params.virtualTranslate && duration !== 0) {
          let eventTriggered = false;
          slides.transitionEnd(() => {
            if (eventTriggered) { return; }
            if (!swiper || swiper.destroyed) { return; }
            eventTriggered = true;
            swiper.animating = false;
            const triggerEvents = ['webkitTransitionEnd', 'transitionend'];
            // tslint:disable-next-line: prefer-for-of
            for (let i = 0; i < triggerEvents.length; i += 1) {
              $wrapperEl.trigger(triggerEvents[i]);
            }
          });
        }
      },
    },
    autoplay: true,
    slidesPerView: 1
  };

  data: ApiModel;
  geoData: Geomodel;
  loaderToShow: any;
  upcomingEventCount = '0';
  role: string;
  priv: string;
  showCreateEvent = false;
  showAttendance = false;
  showScanQR = false;
  privArray: string[];
  scannedData: any;
  toast: any;

  geoLatitude: number;
  geoLongitude: number;
  geoAltitude: number;
  geoAccuracy: number;
  geoAddress: string;

  // Geocoder configuration
  geoencoderOptions: NativeGeocoderOptions = {
    useLocale: true,
    maxResults: 1
  };

  status: string;
  message: string;
  userId: number;
  qrData: Qrmodel;
  barcodeScannerOptions: BarcodeScannerOptions;
  scannerState = new BehaviorSubject(false);
  availableState = new BehaviorSubject(false);

  constructor(
    private authService: AuthenticationService,
    private loadingCtrl: LoadingController,
    private apiService: ApiService,
    private navCtrl: NavController,
    private nativeGeocoder: NativeGeocoder,
    private platform: Platform,
    private geolocation: Geolocation,
    private barcodeScanner: BarcodeScanner,
    private alertCtrl: AlertController
  ) {
    this.data = new ApiModel();
    this.geoData = new Geomodel();

    this.barcodeScannerOptions = {
      showTorchButton: true,
      showFlipCameraButton: true
    };
  }

  ngOnInit() {
    this.showLoader();
    const userData = JSON.parse(this.authService.getItem('USER_INFO'));

    this.data.userId = userData.userId;
    this.data.location = userData.location;
    this.data.batchNo = userData.batchNo;

    this.role = userData.roleName;
    this.priv = userData.privileges;

    if (this.priv === null) {
      this.showCreateEvent = false;
      this.showAttendance = false;
      this.showScanQR = false;
    } else {
      this.privArray = this.priv.split(',');

      // tslint:disable-next-line: prefer-for-of
      for (let i = 0; i < this.privArray.length; i++) {
        if (this.privArray[i] === 'MANAGE_EVENT') {
          this.showCreateEvent = true;
        }
        if (this.privArray[i] === 'MANAGE_ATTENDANCE') {
          this.showAttendance = true;
        }
      }
    }

    this.showScanQR = true;
    this.getUpcomingEventCount();
    this.hideLoader();
  }

  ionViewWillEnter() {
    this.getUpcomingEventCount();
  }

  getUpcomingEventCount() {
    this.upcomingEventCount = '0';
    this.apiService.getUpcomingEvents(this.data).subscribe((response) => {
      this.upcomingEventCount = response.length;
    });
  }

  showLoader() {
    this.loaderToShow = this.loadingCtrl.create({
      message: 'Please wait, loading details'
    }).then((res) => {
      res.present();
      res.onDidDismiss().then((dis) => {});
    });
    this.hideLoader();
  }

  hideLoader() {
    setTimeout(() => {
      this.loadingCtrl.dismiss();
    }, 1000);
  }

  logout() {
    this.showLoader();
    this.authService.logout();
    this.navCtrl.navigateForward('');
    this.hideLoader();
  }

  updateStatus() {
    this.getGeoLocation();
  }

  getGeoLocation() {
    this.platform.ready().then(() => {
      // if (this.platform.is('android')) {
        this.geolocation.getCurrentPosition().then((position) => {
          this.geoLatitude = position.coords.latitude;
          this.geoLongitude = position.coords.longitude;
          this.geoAltitude = position.coords.altitude;
          this.getGeoencoder(position.coords.latitude, position.coords.longitude);
        });
      // }
    });
  }

  // geocoder method to fetch address from coordinates passed as arguments
  getGeoencoder(latitude, longitude) {
    this.nativeGeocoder.reverseGeocode(latitude, longitude, this.geoencoderOptions)
    .then((result) => {
      const response = JSON.parse(JSON.stringify(result[0]));
      this.geoData.userId = this.data.userId;
      this.geoData.latitude = response.latitude;
      this.geoData.longitude = response.longitude;
      this.geoData.altitude = this.geoAltitude;
      this.geoData.dzongkhag = response.administrativeArea;
      this.geoData.locality = response.locality;
      this.geoData.exactLocation = response.thoroughfare;
      if (this.availableState.value) {
        this.geoData.availableStatus = 'AVAILABLE';
      } else {
        this.geoData.availableStatus = 'NOT_AVAILABLE';
      }

      this.apiService.postAvailableStatus(this.geoData).subscribe((res) => {
        if (res.RESULT === 'SUCCESS') {
          this.status = 'Success';
          this.message = 'Your status has been updated as AVAILABLE';
        } else {
          this.status = 'Failure';
          this.message = 'Your status couldnot be updated, please try again';
        }
        this.presentAlert();
      });
    })
    .catch((error: any) => {
      alert('Error getting location' + JSON.stringify(error));
    });
  }

  scanQRCode() {
    if (this.scannerState.value) {
      this.scannerState.next(false);
      return;
    } else {
      this.barcodeScanner.scan(this.barcodeScannerOptions).then((barcodeData) => {
        if (barcodeData.cancelled) {
            return;
        }
        this.navCtrl.pop();
        this.scannedData = barcodeData;
        this.sendAttendance();
    }, (err) => {
        console.error(err);
    });
    }
  }

  sendAttendance() {
    const scannedText: any = JSON.stringify(this.scannedData.text);
    this.qrData.site = scannedText;
    this.qrData.uid = this.userId;
    this.apiService.postQRCodeAttendance(this.qrData).subscribe((response) => {
      if (response.RESULT === 'SUCCESS') {
        this.scannerState.next(true);
        this.status = 'Success';
        this.message = 'Your attendance has been successfully recorded';
      } else {
        this.status = 'Failure';
        this.message = 'Your attendance couldnot be recorded, please try again';
      }
      this.presentAlert();
    });
  }

  async presentAlert() {
      const alert = await this.alertCtrl.create({
      header: this.status.toUpperCase(),
      message: this.message,
      buttons: ['OK']
    });
      await alert.present();
  }

  async presentConfirm() {
    this.availableState.next(false);
    const alert = await this.alertCtrl.create({
      header: 'Confirmation',
      message: 'Click on YES to confirm your availability, otherwise click on NO',
      buttons: [
        {
          text: 'YES',
          handler: () => {
            this.availableState.next(true);
            this.updateStatus();
          }
        },
        {
          text: 'NO',
          handler: () => {
            this.availableState.next(false);
            this.updateStatus();
          }
        }
      ]
    });
    await alert.present();
  }
}
