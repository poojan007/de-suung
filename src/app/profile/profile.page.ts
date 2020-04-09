import { Component, OnInit } from '@angular/core';
import { ApiModel } from '../model/api-model';
import { ApiService } from '../services/api.service';
import { AuthenticationService } from '../services/authentication.service';
import { LoadingController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  loaderToShow: any;
  data: ApiModel;
  name: string;
  desuupId: string;
  cidNo: string;
  dob: string;
  gender: string;
  email: string;
  location: string;
  photoUrl: string;

  constructor(
    private apiService: ApiService,
    private authService: AuthenticationService,
    private loadingCtrl: LoadingController,
    private navCtrl: NavController
  ) {
    this.data = new ApiModel();
  }

  ngOnInit() {
    this.showLoader();
    const userData = JSON.parse(this.authService.getItem('USER_INFO'));
    this.data.userId = userData.userId;

    this.apiService.getProfile(this.data).subscribe((response) => {
      this.name = response[0].userName;
      this.desuupId = response[0].did;
      this.cidNo = response[0].cid;
      this.dob = response[0].dob;
      this.gender = response[0].gender;
      this.email = response[0].email;
      this.location = response[0].location;
      this.photoUrl = response[0].photo;
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

  back() {
    this.navCtrl.navigateForward('/dashboard');
  }

  doRefresh(event) {
    this.apiService.getProfile(this.data.userId).subscribe(data => {
      event.complete();
    });
  }
}
