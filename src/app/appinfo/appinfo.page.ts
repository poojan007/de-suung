import { Component, OnInit } from '@angular/core';
import { AppVersion } from '@ionic-native/app-version/ngx';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-appinfo',
  templateUrl: './appinfo.page.html',
  styleUrls: ['./appinfo.page.scss'],
})
export class AppinfoPage implements OnInit {

  versionNo: any;

  constructor(
    private appVersion: AppVersion,
    private navCtrl: NavController
  ) { }

  ngOnInit() {
    this.appVersion.getVersionNumber().then(version => {
      this.versionNo = version;
    });
  }

  back() {
    this.navCtrl.back();
  }
}
