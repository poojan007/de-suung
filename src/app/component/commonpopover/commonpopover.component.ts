import { Component, OnInit } from '@angular/core';
import { PopoverController, NavController, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-commonpopover',
  templateUrl: './commonpopover.component.html',
  styleUrls: ['./commonpopover.component.scss'],
})
export class CommonpopoverComponent implements OnInit {

  constructor(
    private popOverCtrl: PopoverController,
    private navCtrl: NavController,
    private modalCtrl: ModalController
  ) { }

  ngOnInit() {}

  settings() {
    this.navCtrl.navigateForward('/settings');
    this.popOverCtrl.dismiss();
  }

  logout() {
    this.navCtrl.navigateForward('/logout');
    this.popOverCtrl.dismiss();
  }

}
