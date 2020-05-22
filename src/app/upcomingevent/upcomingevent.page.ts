import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { AuthenticationService } from '../services/authentication.service';
import { ApiModel } from '../model/api-model';
import { LoadingController, ModalController, ActionSheetController, NavController } from '@ionic/angular';
import { EventDetailPage } from '../event-detail/event-detail.page';

@Component({
  selector: 'app-upcomingevent',
  templateUrl: './upcomingevent.page.html',
  styleUrls: ['./upcomingevent.page.scss'],
})
export class UpcomingeventPage implements OnInit {

  dataList = [];
  loaderToShow: any;
  data: ApiModel;

  constructor(
    private apiService: ApiService,
    private authService: AuthenticationService,
    private loadingCtrl: LoadingController,
    public modalCtrl: ModalController,
    private actionSheetController: ActionSheetController,
    private navCtrl: NavController
  ) {
    this.data = new ApiModel();
  }

  ngOnInit() {
    this.showLoader();
    const userData = JSON.parse(this.authService.getItem('USER_INFO'));
    this.data.userId = userData.userId;
    this.data.location = userData.location;
    this.data.batchNo = userData.batchNo;

    this.apiService.getUpcomingEvents(this.data).subscribe((response) => {
      this.dataList  = response;
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

  doRefresh(event) {
    this.apiService.getUpcomingEvents(this.data).subscribe((response) => {
      this.dataList  = response;
    });
    setTimeout(() => {
      event.target.complete();
    }, 2000);
  }

  async openModal(eventId) {
      const modal = await this.modalCtrl.create({
        component: EventDetailPage,
        swipeToClose: true,
        presentingElement: await this.modalCtrl.getTop(),
        componentProps: {
          id: eventId
        }
      });
      modal.onDidDismiss().then((dataReturned) => {
        this.apiService.getUpcomingEvents(this.data).subscribe((response) => {
          this.dataList  = response;
        });
      });
      return await modal.present();
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
