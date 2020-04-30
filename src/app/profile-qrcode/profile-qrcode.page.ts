import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { Desuup } from '../model/desuup';
import { ModalController, PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-profile-qrcode',
  templateUrl: './profile-qrcode.page.html',
  styleUrls: ['./profile-qrcode.page.scss'],
})
export class ProfileQrcodePage implements OnInit {

  data: Desuup;
  profileQrData: string;

  constructor(
    private authService: AuthenticationService,
    private modalCtrl: ModalController
  ) {
    this.data = new Desuup();
  }

  ngOnInit() {
    const userData = JSON.parse(this.authService.getItem('USER_INFO'));
    this.data.id = userData.userId;
    this.data.name = userData.name;
    this.data.did = userData.did;
    this.data.cid = userData.cid;
    this.data.batchNo = userData.batchNo;
    this.data.bloodGroup = userData.bloodgroup;

    this.profileQrData = JSON.stringify(this.data);
  }

  dismissModal() {
    this.modalCtrl.dismiss({});
  }
}
