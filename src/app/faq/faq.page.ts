import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { ActionSheetController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.page.html',
  styleUrls: ['./faq.page.scss'],
})
export class FaqPage implements OnInit {

  faqList: any;

  constructor(
    private apiService: ApiService,
    private actionSheetController: ActionSheetController,
    private navCtrl: NavController
  ) { }

  ngOnInit() {
    this.getDropDownList('faq', 'NA', 'NA');
  }

  getDropDownList(tableName, paramId, colName) {
    this.apiService.getDropDownList(tableName, paramId, colName).subscribe((response) => {
      this.faqList = response;
    });
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
