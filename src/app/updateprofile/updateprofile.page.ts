import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { LoadingController, NavController, AlertController } from '@ionic/angular';
import { ApiService } from '../services/api.service';
import { ApiModel } from '../model/api-model';

@Component({
  selector: 'app-updateprofile',
  templateUrl: './updateprofile.page.html',
  styleUrls: ['./updateprofile.page.scss'],
})
export class UpdateprofilePage implements OnInit {

  loaderToShow: any;
  dzongkhagList: [];
  gewogList: [];
  agencyTypeList: [];
  agencyList: [];
  empTypeList: [];
  qualificationList: [];
  professionalList: [];
  skillList: [];
  interestList: [];

  userId: string;
  desuupName: string;
  email: string;
  mobileNo: number;
  desuupId: string;
  cidNo: string;
  gender: string;
  maritalStatus: string;
  dob: string;
  dzongkhag: string;
  gewog: string;
  village: string;
  location: string;
  bloodGroup: string;
  agencyType: string;
  agency: number;
  employmentType: string;
  designation: string;
  profession: number;
  qualification: string;
  skills: any;
  interests: any;

  status: string;
  message: string;

  data: ApiModel;
  show = false;

  constructor(
    private authService: AuthenticationService,
    private loadingCtrl: LoadingController,
    private apiService: ApiService,
    private navCtrl: NavController,
    private alertCtrl: AlertController
  ) {
    this.data = new ApiModel();
  }

  ngOnInit() {
    const userData = JSON.parse(this.authService.getItem('USER_INFO'));
    this.showLoader();
    this.getDropDownList('dzongkhag', 'dzongkhags', 'NA', 'NA');
    this.getDropDownList('gewog', 'gewogs', 'NA', 'NA');
    this.getDropDownList('agencyType', 'agency_types', 'NA', 'NA');
    this.getDropDownList('empType', 'emp_types', 'NA', 'NA');
    this.getDropDownList('qualification', 'qualifications', 'NA', 'NA');
    this.getDropDownList('profession', 'professions', 'NA', 'NA');
    this.getDropDownList('agencyList', 'agencies', userData.agencyType, 'agency_type');
    this.getDropDownList('skills', 'skills', 'NA', 'NA');
    this.getDropDownList('interests', 'interests', 'NA', 'NA');

    if (this.employmentType === '1') {
      this.show = true;
    }

    this.hideLoader();
  }

  ionViewDidEnter() {
    this.setFormValues();
  }

  getDropDownList(requestType, tableName, paramId, colName) {
    this.apiService.getDropDownList(tableName, paramId, colName).subscribe((response) => {
      if (requestType === 'dzongkhag') {
        this.dzongkhagList = response;
      } else if (requestType === 'gewog') {
        this.gewogList = response;
      } else if (requestType === 'agencyType') {
        this.agencyTypeList = response;
      } else if (requestType === 'agencyList') {
        this.agencyList = response;
      } else if (requestType === 'empType') {
        this.empTypeList = response;
      } else if (requestType === 'qualification') {
        this.qualificationList = response;
      } else if (requestType === 'profession') {
        this.professionalList = response;
      } else if (requestType === 'skills') {
        this.skillList = response;
      } else if (requestType === 'interests') {
        this.interestList = response;
      }
    });
  }

  setFormValues() {
    const userData = JSON.parse(this.authService.getItem('USER_INFO'));
    this.userId = userData.userId;
    this.desuupName = userData.name;
    this.email = userData.email;
    this.mobileNo = userData.mobile;
    this.desuupId  = userData.did;
    this.cidNo = userData.cid;
    this.gender = userData.gender;
    this.maritalStatus = userData.maritalStatus;
    this.dob = userData.dob;
    this.dzongkhag = userData.dzongkhagId;
    this.gewog = userData.gewog;
    this.village = userData.village;
    this.location = userData.location;
    this.bloodGroup = userData.bloodgroup;
    this.agencyType = userData.agencyType;
    this.agency = userData.agencyId;
    this.employmentType = userData.empType;
    this.designation = userData.designation;
    this.profession = userData.profession;
    this.qualification = userData.qualification;
    this.profession = userData.profession;
    this.interests = userData.interest.split(',', userData.interest.length);
    this.skills = userData.skill.split(',', userData.skill.length);
  }

  getAgencyList($event) {
    const paramId = $event.target.value;
    this.getDropDownList('agencyList', 'agencies', paramId, 'agency_type');
  }

  updateProfile() {
    this.data.userId = this.userId;
    this.data.name = this.desuupName;
    this.data.email = this.email;
    this.data.mobile = this.mobileNo;
    this.data.maritalStatus = this.maritalStatus;
    this.data.location = this.location;
    this.data.agencyType = this.agencyType;
    this.data.agencyId = this.agency;
    this.data.empType = this.employmentType;
    this.data.designation = this.designation;
    this.data.profession = this.profession;
    this.data.qualification = this.qualification;
    this.data.interest = this.interests.join(',');
    this.data.skill = this.skills.join(',');

    console.log('Update Profile Data: ' + JSON.stringify(this.data));

    this.apiService.postUpdateProfile(this.data).subscribe((response) => {
      if (response.RESULT === 'SUCCESS') {
        this.status = 'Successful';
        this.message = 'Your profile has been successfully updated.';
        this.navCtrl.navigateForward('/dashboard');
      } else {
        this.status = 'Failure';
        this.message = 'Your profile update failed, please try again.';
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

  toggleForm($event) {
    const type = $event.target.value;
    if (type === '1') {
      this.show = true;
    } else {
      this.show = false;
    }
  }
}
