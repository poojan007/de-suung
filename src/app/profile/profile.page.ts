import { Component, OnInit } from '@angular/core';
import { ApiModel } from '../model/api-model';
import { ApiService } from '../services/api.service';
import { AuthenticationService } from '../services/authentication.service';
import { LoadingController, NavController, PopoverController, ActionSheetController, ModalController } from '@ionic/angular';
import { PopoverComponent } from '../component/popover/popover.component';
import { ProfileQrcodePage } from '../profile-qrcode/profile-qrcode.page';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  loaderToShow: any;
  data: ApiModel;

  bloodGroup: string;
  cidNo: number;
  did: string;
  dob: string;
  dzongkhag: string;
  email: string;
  empType: string;
  gender: string;
  gewog: string;
  location: string;
  maritalStatus: string;
  photoUrl: string;
  qualification: string;
  name: string;
  userType: string;
  village: string;
  mobileNo: number;
  agencyType: string;
  agencyName: string;
  designation: string;
  occupationalGroup: string;
  interests: string;
  skills: string;

  constructor(
    private apiService: ApiService,
    private authService: AuthenticationService,
    private loadingCtrl: LoadingController,
    private navCtrl: NavController,
    private popoverController: PopoverController,
    private actionSheetController: ActionSheetController,
    private modalCtrl: ModalController
  ) {
    this.data = new ApiModel();
  }

  ngOnInit() {
    this.showLoader();
    const userData = JSON.parse(this.authService.getItem('USER_INFO'));
    this.data.userId = userData.userId;

    this.apiService.getProfile(this.data).subscribe((response) => {
      this.bloodGroup = response[0].bloodgroup;
      this.cidNo = response[0].cid;
      this.did = response[0].did;
      this.dob = response[0].dob;
      this.dzongkhag = response[0].dzongkhag;
      this.email = response[0].email;
      this.empType = response[0].emp_type;
      this.gender = response[0].gender;
      this.gewog = response[0].gewog;
      this.location = response[0].location;
      this.maritalStatus = response[0].marital_status;
      this.photoUrl = response[0].photo;
      this.qualification = response[0].qualification;
      this.name = response[0].userName;
      this.userType = response[0].userType;
      this.village = response[0].village;
      this.mobileNo = response[0].mobile;
      this.agencyType = response[0].agency_type;
      this.agencyName = response[0].agencyName;
      this.designation = response[0].designation;
      this.occupationalGroup = response[0].occupationalGroup;
      this.interests = response[0].userInterest;
      this.skills = response[0].userSkill;
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
    }, 1000);
  }

  async presentPopOver(ev: any) {
    const popover = await this.popoverController.create({
      component: PopoverComponent,
      event: ev,
      translucent: true
    });
    return await popover.present();
  }

  async presentActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Profile Actions',
      buttons: [{
        text: 'Profile QR Code',
        icon: 'barcode',
        handler: () => {
          this.generateQRCode();
        }
      }, {
        text: 'Update Profile',
        icon: 'person',
        handler: () => {
          this.navCtrl.navigateForward('/updateprofile');
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

  async generateQRCode() {
    const modal = await this.modalCtrl.create({
      component: ProfileQrcodePage,
      swipeToClose: true,
      presentingElement: await this.modalCtrl.getTop()
    });
    return await modal.present();
  }
}
