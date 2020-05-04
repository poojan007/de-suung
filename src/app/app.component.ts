import { Component } from '@angular/core';

import { Platform, LoadingController, AlertController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AppUpdate } from '@ionic-native/app-update/ngx';
import { AuthenticationService } from './services/authentication.service';
import { LocationtrackerService } from './services/locationtracker.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {

  loaderToShow: any;
  status: string;
  message: string;


  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private appUpdate: AppUpdate,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private authService: AuthenticationService,
    private locationService: LocationtrackerService
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.overlaysWebView(false);
      this.statusBar.backgroundColorByHexString('#428cff');
      this.statusBar.styleLightContent();
      this.splashScreen.hide();

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

      const trackMeFlag = this.locationService.getItem('track_me');
      if (trackMeFlag === null) {
        this.locationService.setItem('track_me', true);
      }

      this.locationService.startBackgroundGeolocation();

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
}
