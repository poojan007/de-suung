import { Component, OnInit } from '@angular/core';
import { ApiModel } from '../model/api-model';
import { AuthenticationService } from '../services/authentication.service';
import { ApiService } from '../services/api.service';
import { NavController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  data: ApiModel;
  cidNo: string;
  password: string;

  constructor(
    private authservice: AuthenticationService,
    private apiService: ApiService,
    private navCtrl: NavController,
    private alertCtrl: AlertController
  ) {
    this.data = new ApiModel();
    this.password = '';
  }

  ngOnInit() {
    const uid = localStorage.getItem('cid');
    if (uid != null) {
      this.cidNo = uid;
    }
  }

  validateLogin() {
    this.data.loginId = this.cidNo;
    this.data.password = this.password;
    this.apiService.validateLogin(this.data).subscribe((response) => {
      console.log(response);
      this.data.roleName = response.roleName;
      this.data.roleId = response.roleId;
      this.data.validation = response.validation;
      this.data.userId = response.userId;
      this.data.name = response.name;
      this.data.did = response.did;
      this.data.village = response.village;
      this.data.bloodgroup = response.bloodgroup;
      this.data.maritalStatus = response.maritalStatus;
      this.data.dob = response.dob;
      this.data.gender = response.gender;
      this.data.email = response.email;
      this.data.location = response.location;
      this.data.userType = response.userType;
      this.data.dzongkhag = response.dzongkhag;
      this.data.gewog = response.gewog;
      this.data.agencyType = response.agency_type;
      this.data.empType = response.emp_type;
      this.data.qualification = response.qualification;
      this.data.privileges = response.userPrivileges;

      if (response.validation === 'true') {
        this.authservice.login(this.data);
        localStorage.setItem('cid', this.cidNo.toString());
        this.navCtrl.navigateForward('/dashboard');
      } else {
        this.presentAlert();
      }
    }, (err) => {
      console.log(err);
    });
  }

  async presentAlert() {
      const alert = await this.alertCtrl.create({
      header: 'FAILURE',
      message: 'Login failed, please try again later',
      buttons: ['OK']
    });
      await alert.present();
  }
}
