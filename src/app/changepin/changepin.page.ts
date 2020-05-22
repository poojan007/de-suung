import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { NavController, LoadingController, ActionSheetController } from '@ionic/angular';

@Component({
  selector: 'app-changepin',
  templateUrl: './changepin.page.html',
  styleUrls: ['./changepin.page.scss'],
})
export class ChangepinPage implements OnInit {

  oldPassword: string;
  newPassword: string;
  confirmPassword: string;

  loaderToShow: any;

  constructor(
    private authService: AuthenticationService,
    private navCtrl: NavController,
    private loadingCtrl: LoadingController,
    private actionSheetController: ActionSheetController
  ) { }

  ngOnInit() {
  }

  changePassword() {
    console.log('inside change password function');
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
    }, 2000);
  }

  logout() {
    this.showLoader();
    this.authService.logout();
    this.navCtrl.navigateForward('');
    this.hideLoader();
  }

  async presentActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Actions',
      buttons: [{
        text: 'Settings',
        icon: 'cog',
        handler: () => {
          this.navCtrl.navigateForward('settings');
        }
      }, {
        text: 'Logout',
        icon: 'log-out',
        handler: () => {
          this.navCtrl.navigateForward('/logout');
        }
      }, {
        text: 'Close',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();
  }

}
