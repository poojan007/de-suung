import { Component, ViewChildren, NgZone } from '@angular/core';

import { Platform, LoadingController, AlertController, NavController, ToastController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AuthenticationService } from './services/authentication.service';
import { LocationtrackerService } from './services/locationtracker.service';
import { FCM } from '@ionic-native/fcm/ngx';
import { BehaviorSubject, Subscription } from 'rxjs';
import { CodePush, SyncStatus } from '@ionic-native/code-push';
import { Network } from '@ionic-native/network/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {

  @ViewChildren('myNav') nav: NavController;

  loaderToShow: any;
  status: string;
  message: string;
  navigateUrl: string;
  receivedBytes: number;
  totalBytes: number;
  progressStatus: string;

  public NetworkStatus: BehaviorSubject<boolean>;
  private WatchConnect: Subscription;
  private WatchDisconnect: Subscription;
  private networkFlag: boolean;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private authService: AuthenticationService,
    private locationService: LocationtrackerService,
    private fcm: FCM,
    private navCtrl: NavController,
    private ngZone: NgZone,
    private toastCtrl: ToastController,
    private network: Network
  ) {
    this.NetworkStatus = new BehaviorSubject(false);
    this.CheckNetworkStatus();
    this.CreateNetworkObserverSubscriptions();
    this.initializeApp();

    if (this.networkFlag) {
      this.setupApp();
    }
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.overlaysWebView(false);
      this.statusBar.backgroundColorByHexString('#428cff');
      this.statusBar.styleLightContent();
      this.splashScreen.hide();
    });
  }

  setupApp() {
    this.platform.ready().then(() => {
      CodePush.sync({}, (progress) => {
        this.ngZone.run(() => {
          this.receivedBytes = progress.receivedBytes;
          this.totalBytes = progress.totalBytes;
        });
      }).subscribe((status) => {
        if (status === SyncStatus.CHECKING_FOR_UPDATE) {
          this.progressStatus = 'Checking for update';
        } else if (status === SyncStatus.DOWNLOADING_PACKAGE) {
          this.progressStatus = 'Downloading package';
        } else if (status === SyncStatus.IN_PROGRESS) {
          this.progressStatus = 'In progress';
        } else if (status === SyncStatus.INSTALLING_UPDATE) {
          this.progressStatus = 'Installing updates';
        } else if (status === SyncStatus.UP_TO_DATE) {
          this.progressStatus = 'App is up to date';
        } else if (status === SyncStatus.UPDATE_INSTALLED) {
          this.progressStatus = 'Updates installed';
        } else if (status === SyncStatus.ERROR) {
          this.progressStatus = 'Error occurred, please try restarting your app';
        }

        this.presentToast(this.progressStatus);
      });
    });

    // Code to enable background location tracking
    const trackMeFlag = this.locationService.getItem('track_me');
    const userData = JSON.parse(this.authService.getItem('USER_INFO'));

    if (trackMeFlag === 'true') {
      this.locationService.startBackgroundGeolocation(userData.userId);
    } else if (trackMeFlag === 'false') {
      this.locationService.stopBackgroundGeolocation();
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
      console.log(JSON.stringify(data));
      if (data.wasTapped) {
        if (data.type === 'INCIDENT_ALERT') {
          this.navCtrl.navigateForward('/map');
          this.authService.setItem('latlng', data);
        } else {
          this.navCtrl.navigateForward('/upcomingevents');
        }
      } else {
        this.status = data.title;
        this.message = data.body;
        if (data.type === 'INCIDENT_ALERT') {
          this.navigateUrl = '/map';
          this.authService.setItem('latlng', data);
        } else {
          this.navigateUrl = '/upcomingevents';
        }

        this.presentConfirm();
      }
    });

    this.fcm.unsubscribeFromTopic('desuung');
  }

  CheckNetworkStatus() {
    if ( this.platform.is('cordova') ) {
        if ( this.network.type === undefined || this.network.type === null || this.network.type === 'unknown') {
            this.UpdateNetworkStatus(false);
        } else {
            this.UpdateNetworkStatus(true);
            this.networkFlag = true;
        }
    } else {
        this.UpdateNetworkStatus(navigator.onLine);
    }
  }

  CreateNetworkObserverSubscriptions() {
    this.WatchConnect = this.network.onConnect().subscribe(
      data => {
        this.UpdateNetworkStatus(true);
        this.setupApp();
      }, error => { console.log(error); }
    );
    this.WatchDisconnect = this.network.onDisconnect().subscribe(
        data => { this.UpdateNetworkStatus(false); },
        error => { console.log(error); }
    );
  }

  UpdateNetworkStatus(IsOnline: boolean) {
    console.log('Network ', (IsOnline === true ? 'Online' : 'Offline'));
    if (!IsOnline) {
      this.status = 'Warning';
      this.message = 'Internet connection unavailable. Please connect to internet and try again';
      this.presentAlert();
    } else {
      this.progressStatus = 'Your back online';
      this.presentToast(this.progressStatus);
    }
    this.NetworkStatus.next(IsOnline);
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

  async presentToast(progressMsg) {
    const toast = await this.toastCtrl.create({
      message: progressMsg,
      duration: 1000,
      position: 'bottom'
    });
    toast.onDidDismiss();
    toast.present();
  }
}
