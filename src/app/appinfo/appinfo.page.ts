import { Component, OnInit } from '@angular/core';
import { AppVersion } from '@ionic-native/app-version/ngx';

@Component({
  selector: 'app-appinfo',
  templateUrl: './appinfo.page.html',
  styleUrls: ['./appinfo.page.scss'],
})
export class AppinfoPage implements OnInit {

  versionNo: any;

  constructor(
    private appVersion: AppVersion
  ) { }

  ngOnInit() {
    // console.log(this.appVersion.getAppName());
    // console.log(this.appVersion.getPackageName());
    // console.log(this.appVersion.getVersionCode());
    // console.log(this.appVersion.getVersionNumber());
    this.appVersion.getVersionNumber().then(version => {
      this.versionNo = version;
    });
  }

}
