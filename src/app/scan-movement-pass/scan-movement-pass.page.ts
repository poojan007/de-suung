import { Component, OnInit } from '@angular/core';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { Platform, AlertController, NavController } from '@ionic/angular';
import { ApiService } from '../services/api.service';
import { AuthenticationService } from '../services/authentication.service';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { Subscription } from 'rxjs';

export class QRData {
  cid: number;
  qr_uuid: string;
  lat: number;
  lng: number;
  accuracy: number;
}

@Component({
  selector: 'app-scan-movement-pass',
  templateUrl: './scan-movement-pass.page.html',
  styleUrls: ['./scan-movement-pass.page.scss'],
})
export class ScanMovementPassPage implements OnInit {

  private preventBack: Subscription;
  qrData: QRData;
  qrUUID: any;
  userCid: number;
  status: string;
  message: string;

  constructor(
    private barcodeScanner: BarcodeScanner,
    private platform: Platform,
    private alertCtrl: AlertController,
    private navCtrl: NavController,
    private apiService: ApiService,
    private geolocation: Geolocation,
    private authService: AuthenticationService
  ) {
    this.qrData = new QRData();
  }

  ngOnInit() {
    const userData = JSON.parse(this.authService.getItem('USER_INFO'));
    this.userCid = userData.cid;
    this.scanQRCode();
  }

  scanQRCode() {
    this.preventBack = this.platform.backButton.subscribeWithPriority(9999, () => {});
    this.barcodeScanner.scan().then((barcodeData) => {
        if (barcodeData.cancelled) {
            this.navCtrl.navigateForward('/dashboard');
        }
        this.navCtrl.pop();
        this.qrUUID = barcodeData;
        this.getGeoLocation();
    }, (err) => {
        console.error(err);
    }).finally(() => {
        window.setTimeout(() => {
            this.preventBack.unsubscribe();
        }, 1000);
    });
  }

  getGeoLocation() {
    this.platform.ready().then(() => {
        this.geolocation.getCurrentPosition().then((position) => {
          this.qrData.qr_uuid = this.qrUUID.text;
          this.qrData.lat = position.coords.latitude;
          this.qrData.lng = position.coords.longitude;
          this.qrData.accuracy = position.coords.accuracy;
          this.qrData.cid = this.userCid;

          this.apiService.postMovementPassScan(this.qrData).subscribe(response => {
            if (response.data !== null) {
              this.status = 'Success';
              this.message = 'QR code successfully scanned with the current location';
            } else {
              this.status = 'Failure';
              this.message = 'QR Code scan failed, please try again with a valid QR code';
            }

            this.presentAlert();
          });
        });
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
}
