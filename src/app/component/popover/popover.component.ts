import { Component, OnInit } from '@angular/core';
import { NavController, PopoverController, ModalController } from '@ionic/angular';
import { ProfileQrcodePage } from 'src/app/profile-qrcode/profile-qrcode.page';

@Component({
  selector: 'app-popover',
  templateUrl: './popover.component.html',
  styleUrls: ['./popover.component.scss'],
})
export class PopoverComponent implements OnInit {

  constructor(
    private popOverCtrl: PopoverController,
    private navCtrl: NavController,
    private modalCtrl: ModalController
  ) { }

  ngOnInit() {}

  async generateQRCode() {
    this.popOverCtrl.dismiss();
    const modal = await this.modalCtrl.create({
      component: ProfileQrcodePage,
      swipeToClose: true,
      presentingElement: await this.modalCtrl.getTop()
    });
    return await modal.present();
  }

  settings() {
    this.navCtrl.navigateForward('/settings');
    this.popOverCtrl.dismiss();
  }

  updateProfile() {
    this.navCtrl.navigateForward('/updateprofile');
    this.popOverCtrl.dismiss();
  }
}
