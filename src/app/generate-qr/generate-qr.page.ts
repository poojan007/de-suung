import { Component, OnInit, Input } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { Qrmodel } from '../model/qrmodel';

@Component({
  selector: 'app-generate-qr',
  templateUrl: './generate-qr.page.html',
  styleUrls: ['./generate-qr.page.scss'],
})
export class GenerateQrPage implements OnInit {

  @Input() eventId: number;
  @Input() eventTitle: string;
  @Input() startDate: string;
  @Input() endDate: string;
  status: string;

  elementType = 'img';
  QRCode: Qrmodel;
  qrData: string;

  constructor(
    private modalCtrl: ModalController,
    private navParams: NavParams
  ) {
    this.QRCode = new Qrmodel();
  }

  ngOnInit() {
    this.eventId = this.navParams.data.id;
    this.eventTitle = this.navParams.data.title;
    this.startDate = this.navParams.data.startDate;
    this.endDate = this.navParams.data.endDate;
    this.generateQRCode();
  }

  generateQRCode() {
    this.QRCode.id = this.eventId;
    this.QRCode.site = 'https://app.desuung.org.bt';
    this.qrData = JSON.stringify(this.QRCode);
  }

  dismiss() {
    this.modalCtrl.dismiss({
      dismissed: this.status
    });
  }

  dismissModal() {
    this.dismiss();
  }
}
