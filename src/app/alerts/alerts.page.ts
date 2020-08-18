import { Component, OnInit } from '@angular/core';
import { NavController, LoadingController } from '@ionic/angular';
import { AuthenticationService } from '../services/authentication.service';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-alerts',
  templateUrl: './alerts.page.html',
  styleUrls: ['./alerts.page.scss'],
})
export class AlertsPage implements OnInit {

  segmentModel = 'INCIDENT';
  userId: string;
  location: string;
  broadCastDataList: [];
  incidentDataList: [];
  loaderToShow: any;

  constructor(
    private navCtrl: NavController,
    private apiService: ApiService,
    private authService: AuthenticationService,
    private loadingCtrl: LoadingController
  ) { }

  ngOnInit() {
    this.showLoader();
    this.userId = localStorage.getItem('userId');
    this.location = localStorage.getItem('location');
    this.getIncidentAlerts();
    this.hideLoader();
  }

  segmentChanged(event) {
    if (this.segmentModel === 'INCIDENT') {
      this.getIncidentAlerts();
    } else if (this.segmentModel === 'BROADCAST') {
      this.getBroadCastMessages();
    }
  }

  getIncidentAlerts() {
    this.apiService.getIncidentAlerts(this.userId).subscribe((response) => {
      this.incidentDataList = response;
    });
  }

  getBroadCastMessages() {
    this.apiService.getBroadCastMessages(this.location).subscribe((response) => {
      this.broadCastDataList = response;
    });
  }

  openMap(lat, long) {
    const data = {
      latitude: lat,
      longitude: long
    };

    this.authService.setItem('latlng', data);
    this.navCtrl.navigateForward('/map');
  }

  back() {
    this.navCtrl.navigateForward('/login');
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
}
