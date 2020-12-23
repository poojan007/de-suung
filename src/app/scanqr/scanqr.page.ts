import { Component, OnInit } from '@angular/core';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { Platform, NavController, AlertController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { ApiService } from '../services/api.service';
import { Qrmodel } from '../model/qrmodel';
import { AuthenticationService } from '../services/authentication.service';
import { NativeGeocoder, NativeGeocoderOptions } from '@ionic-native/native-geocoder/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';

@Component({
  selector: 'app-scanqr',
  templateUrl: './scanqr.page.html',
  styleUrls: ['./scanqr.page.scss'],
})
export class ScanqrPage implements OnInit {

  private preventBack: Subscription;
  status: string;
  message: string;
  scannedData: {};
  userId: number;
  qrData: Qrmodel;
  latitude: number;
  longitude: number;
  altitude: number;
  dzongkhag: string;
  locality: string;
  exactLocation: string;

  eventLat: number;
  eventLong: number;
  eventRadius: number;
  eventId: number;

  constructor(
    private barcodeScanner: BarcodeScanner,
    private platform: Platform,
    private alertCtrl: AlertController,
    private navCtrl: NavController,
    private apiService: ApiService,
    private authService: AuthenticationService,
    private nativeGeocoder: NativeGeocoder,
    private geolocation: Geolocation,
  ) {
    this.qrData = new Qrmodel();
  }

  ngOnInit() {
    const userData = JSON.parse(this.authService.getItem('USER_INFO'));
    this.userId = userData.userId;
    this.scanQRCode();
  }

  scanQRCode() {
    this.preventBack = this.platform.backButton.subscribeWithPriority(9999, () => {});
    this.barcodeScanner.scan().then((barcodeData) => {
        if (barcodeData.cancelled) {
            this.navCtrl.navigateForward('/dashboard');
        }
        this.navCtrl.pop();
        this.scannedData = barcodeData;
        this.getGeoLocation();
    }, (err) => {
        console.error(err);
    }).finally(() => {
        window.setTimeout(() => {
            this.preventBack.unsubscribe();
        }, 1000);
    });
  }

  getGeoLocation() {
    this.platform.ready().then(() => {
      // if (this.platform.is('android')) {
        this.geolocation.getCurrentPosition().then((position) => {
          this.altitude = position.coords.altitude;
          this.latitude = position.coords.latitude;
          this.longitude = position.coords.longitude;
          this.dzongkhag = '';
          this.locality = '';
          this.exactLocation = '';
          this.sendAttendance();
          // this.getGeoencoder(position.coords.latitude, position.coords.longitude);
        });
      // }
    });
  }

  // geocoder method to fetch address from coordinates passed as arguments
  getGeoencoder(latitude, longitude) {
    // Geocoder configuration
    const geoencoderOptions: NativeGeocoderOptions = {
      useLocale: true,
      maxResults: 1
    };
    this.nativeGeocoder.reverseGeocode(latitude, longitude, geoencoderOptions)
    .then((result) => {
      const response = JSON.parse(JSON.stringify(result[0]));
      this.latitude = response.latitude;
      this.longitude = response.longitude;
      this.altitude = this.altitude;
      this.dzongkhag = response.administrativeArea;
      this.locality = response.locality;
      this.exactLocation = response.thoroughfare;

      this.sendAttendance();
      // this.checkIfAttendanceWithInTheGeofence(this.latitude, this.longitude);
    })
    .catch((error: any) => {
      alert('Error getting location' + JSON.stringify(error));
    });
  }

  checkIfAttendanceWithInTheGeofence(latitude, longitude) {
    const scannedText = this.scannedData['text'].id;
    this.eventId = scannedText.id;

    this.apiService.getEventDetails(this.eventId).subscribe((response) => {
      this.eventLat = response.latitude;
      this.eventLong = response.longitude;
      this.eventRadius = response.radius;
    });
  }

  sendAttendance() {
    const scannedText: any = JSON.stringify(this.scannedData['text']);
    this.qrData.site = scannedText;
    this.qrData.uid = this.userId;
    this.qrData.latitude = this.latitude;
    this.qrData.longitude = this.longitude;
    this.qrData.altitude = this.latitude;
    this.qrData.dzongkhag = this.dzongkhag;
    this.qrData.locality = this.locality;
    this.qrData.exactLocation = this.exactLocation;
    this.apiService.postQRCodeAttendance(this.qrData).subscribe((response) => {
      if (response.RESULT === 'SUCCESS') {
        this.status = 'Success';
        this.message = 'Your attendance has been successfully recorded.';
      } else if (response.RESULT === 'LOCATION_MISMATCH') {
        this.status = 'Location Mismatch';
        // tslint:disable-next-line: max-line-length
        this.message = 'You are not within the specified event perimeter, Your attendance cannot be recorded. Note: Your current location has been recorded.';
      } else {
        this.status = 'Failure';
        this.message = 'Your attendance couldnot be recorded, please try again.';
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
}
