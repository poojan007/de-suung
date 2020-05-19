import { Component, OnInit } from '@angular/core';
import { ModalController, Platform, AlertController } from '@ionic/angular';
import { AuthenticationService } from '../services/authentication.service';
import { ApiModel } from '../model/api-model';
import { Geomodel } from '../model/geomodel';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-incident-alert',
  templateUrl: './incident-alert.page.html',
  styleUrls: ['./incident-alert.page.scss'],
})
export class IncidentAlertPage implements OnInit {

  data: ApiModel;
  alertData: Geomodel;
  eventDetail: string;
  msg: string;
  status: string;
  showBroadCastMsgDiv = false;
  locationList: any;

  constructor(
    private modalCtrl: ModalController,
    private authService: AuthenticationService,
    private platform: Platform,
    private geolocation: Geolocation,
    private apiService: ApiService,
    private alertCtrl: AlertController
  ) {
    this.data = new ApiModel();
    this.alertData = new Geomodel();
  }

  ngOnInit() {
    const userData = JSON.parse(this.authService.getItem('USER_INFO'));
    this.data.userId = userData.userId;
    this.data.roleId = userData.roleId;

    if (userData.roleId === '1') {
      this.showBroadCastMsgDiv = true;
    }

    this.getDropDownList('location', 'dzongkhags', 'NA', 'NA');
  }

  getDropDownList(requestType, tableName, paramId, colName) {
    this.apiService.getDropDownList(tableName, paramId, colName).subscribe((response) => {
      if (requestType === 'location') {
        this.locationList = response;
      }
    });
  }

  reportIncidentAlert() {
    this.platform.ready().then(() => {
        this.geolocation.getCurrentPosition().then((position) => {
          this.alertData.userId = this.data.userId;
          this.alertData.latitude = position.coords.latitude;
          this.alertData.longitude = position.coords.longitude;
          this.alertData.altitude = position.coords.altitude;
          this.alertData.incidentMsg = this.eventDetail;
          this.alertData.title = 'Incident Alert';
          console.log(JSON.stringify(this.alertData));
          this.apiService.postIncidentAlert(this.alertData).subscribe((res) => {
            // if (res.RESULT === 'SUCCESS') {
            // this.status = 'Success';
            // this.msg = 'Incident alert has been successfully broadcasted to all the nearby desuups';
            // } else {
            //   this.status = 'Failure';
            //   this.msg = 'Incident alert could not be broadcasted, please try again';
            // }
          });
          this.presentAlert();
          this.eventDetail = '';
        });
    });
  }

  async presentAlert() {
    const alert = await this.alertCtrl.create({
      header: 'Success',
      message: 'Incident alert has been successfully broadcasted to all the nearby desuups',
      buttons: ['OK']
    });
    await alert.present();
  }

  dismiss() {
    this.modalCtrl.dismiss({
      dismissed: 'SUCCESS'
    });
  }

  dismissModal() {
    this.dismiss();
  }
}
