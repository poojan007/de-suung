import { Component, OnInit } from '@angular/core';
import { CallNumber } from '@ionic-native/call-number/ngx';
import { EmailComposer } from '@ionic-native/email-composer/ngx';
import { ActionSheetController, NavController, PopoverController } from '@ionic/angular';
import { CommonpopoverComponent } from '../component/commonpopover/commonpopover.component';

@Component({
  selector: 'app-contactus',
  templateUrl: './contactus.page.html',
  styleUrls: ['./contactus.page.scss'],
})
export class ContactusPage implements OnInit {

  constructor(
    private callNumber: CallNumber,
    private emailComposer: EmailComposer,
    private actionSheetController: ActionSheetController,
    private navCtrl: NavController,
    private popoverController: PopoverController
  ) { }

  ngOnInit() {
  }

  // tslint:disable-next-line: variable-name
  call(number) {
    this.callNumber.callNumber(number, true)
    .then(res => console.log('Launched dialer!', res))
    .catch(err => console.log('Error launching dialer', err));
  }

  sendEmail() {
    this.emailComposer.isAvailable().then((available: boolean) => {
      if (available) {}
     });

    const email = {
       to: 'desuung11@gmail.com',
       subject: 'Desuung App Issues',
       body: 'Please write your email here',
       isHtml: true
     };
     // Send a text message using default options
    this.emailComposer.open(email);
  }

  back() {
    this.navCtrl.back();
  }

  async presentPopover(ev: any) {
    const popover = await this.popoverController.create({
      component: CommonpopoverComponent,
      cssClass: 'my-custom-class',
      event: ev,
      translucent: true
    });
    return await popover.present();
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
