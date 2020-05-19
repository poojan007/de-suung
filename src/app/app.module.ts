import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AuthenticationService } from './services/authentication.service';
import { AuthGuard } from './guard/auth-guard.service';
import { HttpClientModule } from '@angular/common/http';
import { EventDetailPageModule } from './event-detail/event-detail.module';
import { AttendancePageModule } from './attendance/attendance.module';
import { DatePicker } from '@ionic-native/date-picker/ngx';
import { DatePipe } from '@angular/common';
import { IonicSelectableModule } from 'ionic-selectable';
import { GenerateQrPageModule } from './generate-qr/generate-qr.module';
import { NgxQRCodeModule } from 'ngx-qrcode2';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { CallNumber } from '@ionic-native/call-number/ngx';
import { EmailComposer } from '@ionic-native/email-composer/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { NativeGeocoder } from '@ionic-native/native-geocoder/ngx';
import { ProfileQrcodePageModule } from './profile-qrcode/profile-qrcode.module';
import { AppVersion } from '@ionic-native/app-version/ngx';
import { BackgroundGeolocation } from '@ionic-native/background-geolocation/ngx';
import { FCM } from '@ionic-native/fcm/ngx';
import { IncidentAlertPageModule } from './incident-alert/incident-alert.module';
import { AppUpdate } from '@ionic-native/app-update/ngx';
import { Network } from '@ionic-native/network/ngx';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    EventDetailPageModule,
    AttendancePageModule,
    IonicSelectableModule,
    GenerateQrPageModule,
    NgxQRCodeModule,
    ProfileQrcodePageModule,
    IncidentAlertPageModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    AuthenticationService,
    AuthGuard,
    DatePicker,
    DatePipe,
    BarcodeScanner,
    CallNumber,
    EmailComposer,
    Geolocation,
    NativeGeocoder,
    AppVersion,
    BackgroundGeolocation,
    FCM,
    AppUpdate,
    Network,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
