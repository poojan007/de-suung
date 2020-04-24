import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { ApiModel } from '../model/api-model';
import { LoadingController, NavController, Platform, ToastController } from '@ionic/angular';
import { ApiService } from '../services/api.service';

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

  constructor(
    private authService: AuthenticationService,
    private loadingCtrl: LoadingController,
    private apiService: ApiService,
    private navCtrl: NavController
  ) {
    this.data = new ApiModel();
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
}
