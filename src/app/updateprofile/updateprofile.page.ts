import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { LoadingController, NavController } from '@ionic/angular';
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

  data: ApiModel;

  constructor(
    private authService: AuthenticationService,
    private loadingCtrl: LoadingController,
    private apiService: ApiService,
    private navCtrl: NavController
  ) {
    this.data = new ApiModel();
  }

  ngOnInit() {
    this.showLoader();
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

    this.getDropDownList('dzongkhag', 'dzongkhags', 'NA', 'NA');
    this.getDropDownList('gewog', 'gewogs', 'NA', 'NA');
    this.getDropDownList('agencyType', 'agency_types', 'NA', 'NA');
    this.getDropDownList('empType', 'emp_types', 'NA', 'NA');
    this.getDropDownList('qualification', 'qualifications', 'NA', 'NA');
    this.getDropDownList('profession', 'professions', 'NA', 'NA');
    this.getDropDownList('agencyList', 'agencies', this.agencyType, 'agency_type');

    this.hideLoader();
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
      }
    });
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

    console.log(JSON.stringify(this.data));
    this.apiService.postUpdateProfile(this.data).subscribe((response) => {
      console.log(response);
      this.navCtrl.navigateForward('/dashboard');
    });
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
    }, 2000);
  }
}
