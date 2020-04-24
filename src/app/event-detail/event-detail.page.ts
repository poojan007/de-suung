import { Component, OnInit, Input } from '@angular/core';
import { ModalController, NavParams, AlertController } from '@ionic/angular';
import { ApiService } from '../services/api.service';
import { ApiModel } from '../model/api-model';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.page.html',
  styleUrls: ['./event-detail.page.scss'],
})
export class EventDetailPage implements OnInit {

  @Input() eventId: string;
  dataList = [];
  data: ApiModel;
  status: string;
  message: string;

  constructor(
    private modalCtrl: ModalController,
    private navParams: NavParams,
    private apiService: ApiService,
    private authService: AuthenticationService,
    private alertCtrl: AlertController
  ) {
    this.data = new ApiModel();
  }

  ngOnInit() {
    const userData = JSON.parse(this.authService.getItem('USER_INFO'));
    this.data.userId = userData.userId;

    this.eventId = this.navParams.data.id;
    this.apiService.getEventDetails(this.eventId).subscribe((response) => {
      console.log(response);
      this.dataList  = response;
    });
  }

  register() {
    this.data.eventId = this.eventId;
    this.apiService.registerForEvent(this.data).subscribe((response) => {
      if (response.RESULT === 'SUCCESS') {
        this.status = 'Success';
        this.message = 'Your have successfully registered for the event';
      } else if (response.RESULT === 'ALREADY_REGISTERED') {
        this.status = 'Success';
        this.message = 'Your have successfully registered for the event';
      } else {
        this.status = 'Failure';
        this.message = 'Event registration failed, please try again';
      }

      this.presentAlert();
      this.dismiss();
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

  dismiss() {
    this.modalCtrl.dismiss({
      dismissed: this.status
    });
  }

  dismissModal() {
    this.dismiss();
  }
}
