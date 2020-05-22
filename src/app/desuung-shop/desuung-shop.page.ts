import { Component, OnInit } from '@angular/core';
import { ActionSheetController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-desuung-shop',
  templateUrl: './desuung-shop.page.html',
  styleUrls: ['./desuung-shop.page.scss'],
})
export class DesuungShopPage implements OnInit {

  constructor(
    private actionSheetController: ActionSheetController,
    private navCtrl: NavController
  ) { }

  ngOnInit() {
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
}
