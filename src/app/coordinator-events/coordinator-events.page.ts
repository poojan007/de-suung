import { Component, OnInit } from '@angular/core';
import { ApiModel } from '../model/api-model';
import { ApiService } from '../services/api.service';
import { AuthenticationService } from '../services/authentication.service';
import { LoadingController, ModalController } from '@ionic/angular';
import { AttendancePage } from '../attendance/attendance.page';
import { GenerateQrPage } from '../generate-qr/generate-qr.page';

@Component({
  selector: 'app-coordinator-events',
  templateUrl: './coordinator-events.page.html',
  styleUrls: ['./coordinator-events.page.scss'],
})
export class CoordinatorEventsPage implements OnInit {

  dataList = [];
  loaderToShow: any;
  data: ApiModel;
  status: string;
  message: string;

  constructor(
    private apiService: ApiService,
    private authService: AuthenticationService,
    private loadingCtrl: LoadingController,
    private modalCtrl: ModalController
  ) {
    this.data = new ApiModel();
  }

  ngOnInit() {
    this.showLoader();
    const userData = JSON.parse(this.authService.getItem('USER_INFO'));
    this.data.userId = userData.userId;

    this.apiService.getCoordinatorEventList(this.data).subscribe((response) => {
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
    }, 4000);
  }

  async takeAttendance(eventId, eventTitle) {
    const modal = await this.modalCtrl.create({
      component: AttendancePage,
      swipeToClose: true,
      presentingElement: await this.modalCtrl.getTop(),
      componentProps: {
        id: eventId,
        title: eventTitle
      }
    });
    modal.onDidDismiss().then((dataReturned) => {
      this.apiService.getCoordinatorEventList(this.data).subscribe((response) => {
        this.dataList  = response;
      });
    });
    return await modal.present();
  }

  async generateQRCode(eventId, eventTitle, startDateStr, endDateStr) {
    const modal = await this.modalCtrl.create({
      component: GenerateQrPage,
      swipeToClose: true,
      presentingElement: await this.modalCtrl.getTop(),
      componentProps: {
        id: eventId,
        title: eventTitle,
        startDate: startDateStr,
        endDate: endDateStr
      }
    });
    modal.onDidDismiss().then((dataReturned) => {
      this.apiService.getCoordinatorEventList(this.data).subscribe((response) => {
        this.dataList  = response;
      });
    });
    return await modal.present();
  }
}
