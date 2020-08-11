import { Component, OnInit } from '@angular/core';
import { ApiModel } from '../model/api-model';
import { ApiService } from '../services/api.service';
import { AuthenticationService } from '../services/authentication.service';
import { LoadingController, AlertController, ActionSheetController, NavController, PopoverController } from '@ionic/angular';
import { CommonpopoverComponent } from '../component/commonpopover/commonpopover.component';

@Component({
  selector: 'app-registeredevents',
  templateUrl: './registeredevents.page.html',
  styleUrls: ['./registeredevents.page.scss'],
})
export class RegisteredeventsPage implements OnInit {

  dataList = [];
  loaderToShow: any;
  data: ApiModel;
  status: string;
  message: string;

  constructor(
    private apiService: ApiService,
    private authService: AuthenticationService,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private actionSheetController: ActionSheetController,
    private navCtrl: NavController,
    private popoverController: PopoverController
  ) {
    this.data = new ApiModel();
  }

  ngOnInit() {
    this.showLoader();
    const userData = JSON.parse(this.authService.getItem('USER_INFO'));
    this.data.userId = userData.userId;

    this.apiService.getRegisteredEvents(this.data).subscribe((response) => {
      this.dataList  = response;
    });

    this.hideLoader();
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

  cancelEvent(eventId) {
    this.data.eventId = eventId;
    this.apiService.cancelEvent(this.data).subscribe((response) => {
      if (response.RESULT === 'SUCCESS') {
        this.status = 'Successful';
        this.message = 'Your have successfully deregistered for the event';
        this.presentAlert();
        this.apiService.getRegisteredEvents(this.data).subscribe((response1) => {
          this.dataList  = response1;
        });
      } else {
        this.status = 'Failure';
        this.message = 'Deregistration failed, please try again';
        this.presentAlert();
      }
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

  back() {
    this.navCtrl.back();
  }

  async presentPopover(ev: any) {
    const popover = await this.popoverController.create({
      component: CommonpopoverComponent,
      cssClass: 'my-custom-class',
      event: ev,
      translucent: true
    });
    return await popover.present();
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
