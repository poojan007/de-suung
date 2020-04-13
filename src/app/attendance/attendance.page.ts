import { Component, OnInit, Input } from '@angular/core';
import { ModalController, NavParams, AlertController } from '@ionic/angular';
import { ApiService } from '../services/api.service';
import { AuthenticationService } from '../services/authentication.service';
import { ApiModel } from '../model/api-model';

@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.page.html',
  styleUrls: ['./attendance.page.scss'],
})
export class AttendancePage implements OnInit {

  @Input() eventId: string;
  @Input() eventTitle: string;
  data: ApiModel;
  dataList = [];
  loadedDataList = [];
  totalAbsentDays = [];
  hiddenUserId = [];
  multiValArray: any = [];
  isItemAvailable = false;
  attendanceStr: string = '';
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
    this.eventTitle = this.navParams.data.title;
    this.apiService.getRegisteredDesuupList(this.eventId).subscribe((response) => {
      console.log(response);
      this.dataList  = response;
      this.loadedDataList = response;
    });
  }

  initializeItems() {
    this.dataList = this.loadedDataList;
  }

  filterList(evt) {
    this.initializeItems();
    const searchTerm = evt.srcElement.value;
    if (!searchTerm) {
      return;
    }

    this.dataList = this.dataList.filter(data => {
      if (data.name && searchTerm) {
        if (data.name.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1) {
          return true;
        }
        return false;
      }
    });
  }

  sendAttendance() {
    let countFlag = 0;
    this.attendanceStr = '';

    for (let i = 0; i < this.dataList.length; i++) {
      if (countFlag > 0) {
        this.attendanceStr = this.attendanceStr + '@';
      }

      this.attendanceStr = this.attendanceStr + this.eventId + '~' + this.dataList[i].userId + '~' + this.totalAbsentDays[i];
      countFlag++;
    }

    console.log(this.attendanceStr);

    this.apiService.postDesuupAttendance(this.attendanceStr).subscribe((response) => {
      if (response.RESULT === 'SUCCESS') {
        this.status = 'Successful';
        this.message = 'Attendance has been successfully updated';
      } else {
        this.status = 'Failure';
        this.message = 'Attendance update failed, please try again';
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

  dismiss() {
    this.modalCtrl.dismiss({
      dismissed: this.status
    });
  }

  dismissModal() {
    this.dismiss();
  }
}
