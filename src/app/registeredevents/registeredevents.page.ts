import { Component, OnInit } from '@angular/core';
import { ApiModel } from '../model/api-model';
import { ApiService } from '../services/api.service';
import { AuthenticationService } from '../services/authentication.service';
import { LoadingController, AlertController } from '@ionic/angular';

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
    private alertCtrl: AlertController
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
}
