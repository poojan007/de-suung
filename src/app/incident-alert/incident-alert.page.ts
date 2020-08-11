import { Component, OnInit } from '@angular/core';
import { ModalController, Platform, AlertController, ActionSheetController, NavController, PopoverController } from '@ionic/angular';
import { AuthenticationService } from '../services/authentication.service';
import { ApiModel } from '../model/api-model';
import { Geomodel } from '../model/geomodel';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { ApiService } from '../services/api.service';
import { SpeechRecognition } from '@ionic-native/speech-recognition/ngx';
import { ChangeDetectorRef } from '@angular/core';
import { CommonpopoverComponent } from '../component/commonpopover/commonpopover.component';

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
  userId: string;

  message: string;
  location: any;

  matches: string[];
  isRecording = false;

  constructor(
    private modalCtrl: ModalController,
    private authService: AuthenticationService,
    private platform: Platform,
    private geolocation: Geolocation,
    private apiService: ApiService,
    private alertCtrl: AlertController,
    private actionSheetController: ActionSheetController,
    private navCtrl: NavController,
    private speechRecognition: SpeechRecognition,
    private cd: ChangeDetectorRef,
    private popoverController: PopoverController
  ) {
    this.data = new ApiModel();
    this.alertData = new Geomodel();
  }

  ngOnInit() {
    const userData = JSON.parse(this.authService.getItem('USER_INFO'));
    this.data.userId = userData.userId;
    this.userId = userData.userId;
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
          });
          this.status = 'Success';
          this.msg = 'Incident alert has been successfully broadcasted to all the nearby desuups';
          this.presentAlert();
          this.eventDetail = '';
        });
    });
  }

  broadCastMessage() {
    this.alertData.userId = this.userId;
    this.alertData.message = this.message;
    this.alertData.location = this.location.join(',');
    console.log(JSON.stringify(this.alertData));
    this.apiService.broadCastMessage(this.alertData).subscribe((res) => {
      this.status = 'Success';
      this.msg = 'Message has been successfully broadcasted to the selected desuups';
      this.presentAlert();
    });
  }

  async presentAlert() {
    const alert = await this.alertCtrl.create({
      header: this.status,
      message: this.msg,
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

  isIOS() {
    return this.platform.is('ios');
  }

  getPermission() {
    this.speechRecognition.hasPermission()
    .then((hasPermission: boolean) => {
      if (!hasPermission) {
        this.speechRecognition.requestPermission();
      }
    });
  }

  startListening(requestType) {
    this.getPermission();

    const options = {
      language: 'en-US'
    };

    this.speechRecognition.startListening(options).subscribe(matches => {
      this.matches = matches;

      if (requestType === 'INCIDENT_ALERT') {
        this.eventDetail = matches[0];
      } else {
        this.message = matches[0];
      }
      this.cd.detectChanges();
    });
    this.isRecording = true;
  }

  stopListening() {
    if (this.platform.is('ios')) {
      this.speechRecognition.stopListening().then(() => {
        this.isRecording = false;
      });
    }
  }
}
