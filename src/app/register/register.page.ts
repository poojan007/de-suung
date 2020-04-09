import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { ApiModel } from '../model/api-model';
import { AlertController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  username: string;
  emailAddress: string;
  desuupId: string;
  cidNo: string;

  status: string;
  message: string;

  data: ApiModel;

  constructor(
    private apiService: ApiService,
    private alertCtrl: AlertController,
    private navCtrl: NavController
  ) {
    this.data = new ApiModel();
  }

  ngOnInit() {
  }

  register() {
    this.data.name = this.username;
    this.data.email = this.emailAddress;
    this.data.did = this.desuupId;
    this.data.cid = this.cidNo;

    this.apiService.register(this.data).subscribe((response) => {
      if (response === 'SUCCESS') {
        this.status = 'Success';
        this.message = 'Your are successfully registered, please login to start using the system';
      } else {
        this.status = 'Failure';
        this.message = 'Registration failed, please try again later';
      }
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

  back() {
    this.navCtrl.navigateForward('/login');
  }
}
