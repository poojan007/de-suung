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
  selected = [];
  multiValArray: any = [];
  isItemAvailable = false;
  attendanceStr: string;
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
    console.log(this.eventId);
    this.apiService.getRegisteredDesuupList(this.eventId).subscribe((response) => {
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

  getSelected(isChecked, value) {
    if (isChecked === true) {
      this.loadedDataList.push(value);
    } else {
      this.loadedDataList.splice(this.multiValArray.indexOf(value), 1);
    }
  }

  sendAttendance() {
    if (this.loadedDataList.length > 0) {
      for (let i = 0; i < this.loadedDataList.length; i++) {
        if (i === 0) {
          this.attendanceStr = this.eventId + '@' + this.loadedDataList[i];
        } else {
          this.attendanceStr = this.attendanceStr + ':' + this.loadedDataList[i];
        }
      }
      console.log('Attendance String: ' + this.attendanceStr);
    } else {
      this.status = 'Warning';
      this.message = 'Atleast one person has to be selected';
      this.presentAlert();
    }
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
