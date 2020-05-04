import { Component } from '@angular/core';

import { Platform, LoadingController, AlertController, NavController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AppUpdate } from '@ionic-native/app-update/ngx';
import { AuthenticationService } from './services/authentication.service';
import { LocationtrackerService } from './services/locationtracker.service';
import { FCM } from '@ionic-native/fcm/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {

  loaderToShow: any;
  status: string;
  message: string;
  navigateUrl: string;


  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private appUpdate: AppUpdate,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private authService: AuthenticationService,
    private locationService: LocationtrackerService,
    private fcm: FCM,
    private navCtrl: NavController
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.overlaysWebView(false);
      this.statusBar.backgroundColorByHexString('#428cff');
      this.statusBar.styleLightContent();
      this.splashScreen.hide();

      // Code to check for app updates
      if (this.platform.is('android') || this.platform.is('ios')) {
        this.showLoader();
        const updateUrl = 'https://app.desuung.org.bt/app/app_update.xml';
        this.appUpdate.checkAppUpdate(updateUrl).then(update => {
          this.hideLoader();
        }).catch(error => {
          this.hideLoader();
          console.log('Error: ' + error.msg);
        });
      }

      // Code to enable background location tracking
      const trackMeFlag = this.locationService.getItem('track_me');
      if (trackMeFlag === 'true') {
        this.locationService.startBackgroundGeolocation();
      } else if (trackMeFlag === 'false') {
        this.locationService.stopBackgroundGeolocation();
      } else {
        this.locationService.setItem('track_me', true);
        this.locationService.startBackgroundGeolocation();
      }

      // Code to enable Firebase Cloud Messaging
      this.fcm.subscribeToTopic('desuung');

      this.fcm.getToken().then(token => {
        this.authService.setItem('fcm_token', token);
      });

      this.fcm.onTokenRefresh().subscribe(token => {
        this.authService.setItem('fcm_token', token);
      });

      this.fcm.onNotification().subscribe(data => {
        if (data.wasTapped) {
          console.log('data was tapped');
          console.log(JSON.stringify(data));
          if (data.message.data.type === 'INCIDENT_ALERT') {
            this.navCtrl.navigateRoot('/map');
          } else {
            this.navCtrl.navigateRoot('/upcomingevents');
          }
        } else {
          this.status = data.title;
          this.message = data.body;
          if (data.type === 'INCIDENT_ALERT') {
            this.navigateUrl = '/map';
          } else {
            this.navigateUrl = '/upcomingevents';
          }

          this.presentConfirm();
        }
      });

      this.fcm.unsubscribeFromTopic('desuung');
    });
  }

  showLoader() {
    this.loaderToShow = this.loadingCtrl.create({
      message: 'Please wait, checking for updates...'
    }).then((res) => {
      res.present();
      res.onDidDismiss().then((dis) => {});
    });
    this.hideLoader();
  }

  hideLoader() {
    setTimeout(() => {
      this.loadingCtrl.dismiss();
    }, 2000);
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
    const alert = await this.alertCtrl.create({
      header: this.status.toUpperCase(),
      message: this.message,
      buttons: [
        {
          text: 'Yes',
          handler: () => {
            this.navCtrl.navigateForward(this.navigateUrl);
          }
        },
        {
          text: 'No',
          role: 'cancel',
          handler: () => {
            console.log('Cancel Clicked');
          }
        }
      ]
    });
    await alert.present();
  }
}
