import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
// tslint:disable-next-line: max-line-length
import { BackgroundGeolocation, BackgroundGeolocationConfig, BackgroundGeolocationResponse, BackgroundGeolocationEvents } from '@ionic-native/background-geolocation/ngx';
import { HttpClient } from '@angular/common/http';
import { ApiService } from './api.service';
import { Geomodel } from '../model/geomodel';
import { NativeGeocoderOptions, NativeGeocoder } from '@ionic-native/native-geocoder/ngx';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class LocationtrackerService {

  trackState = new BehaviorSubject(false);
  geoData: Geomodel;
  watch: any;
  lat: number;
  lng: number;
  bearing: number;
  speed: number;
  intervalTime = 20000;

  config: BackgroundGeolocationConfig = {
    stationaryRadius: 20,
    distanceFilter: 30,
    notificationTitle: 'De-Suung App Background Tracking',
    notificationText: 'ENABLED',
    debug: false,
    desiredAccuracy: 10,
    stopOnTerminate: false,
    interval: 300000,
    fastestInterval: 300000,
    activitiesInterval: 300000,
    startForeground: true,
    stopOnStillActivity: true,
    activityType: 'AutomotiveNavigation',
    saveBatteryOnBackground: true,
    maxLocations: 10,
    // interval: 2000,
    // fastestInterval: 5000,
    // activitiesInterval: 10000
  };

  // Geocoder configuration
  geoencoderOptions: NativeGeocoderOptions = {
    useLocale: true,
    maxResults: 1
  };

  constructor(
    public backgroundGeolocation: BackgroundGeolocation,
    private http: HttpClient,
    private apiService: ApiService,
    private nativeGeocoder: NativeGeocoder,
    private toastCtrl: ToastController
  ) {
    this.geoData = new Geomodel();
  }

  startBackgroundGeolocation(userId) {
    this.backgroundGeolocation.configure(this.config).then(() => {
      this.backgroundGeolocation
        .on(BackgroundGeolocationEvents.location)
        .subscribe((location: BackgroundGeolocationResponse) => {
          this.interval(location, userId);
        });
    });
    // start recording location
    this.backgroundGeolocation.start();
    this.trackState.next(true);
  }

  sendGPS(location, userId) {
    if (location.speed === undefined) {
      location.speed = 0;
    }

    this.getGeoencoder(location.latitude, location.longitude, userId);
    this.backgroundGeolocation.finish();
  }

  interval(location, userId) {
    setInterval(() => {
      this.sendGPS(location, userId);
    }, this.intervalTime);
  }

  getGeoencoder(latitude, longitude, userId) {
    this.nativeGeocoder.reverseGeocode(latitude, longitude, this.geoencoderOptions)
    .then((result) => {
      const response = JSON.parse(JSON.stringify(result[0]));
      this.geoData.userId = userId;
      this.geoData.latitude = response.latitude;
      this.geoData.longitude = response.longitude;
      this.geoData.altitude = response.altitude;
      this.geoData.dzongkhag = response.administrativeArea;
      this.geoData.locality = response.locality;
      this.geoData.exactLocation = response.thoroughfare;
      this.geoData.availableStatus = 'AVAILABLE';

      console.log(JSON.stringify(this.geoData));
      this.apiService.postAvailableStatus(this.geoData).subscribe((res) => {
        console.log(JSON.stringify(res));
        // this.presentToast();
      });
    })
    .catch((error: any) => {
      console.log('Error getting location' + JSON.stringify(error));
    });
  }

  stopBackgroundGeolocation() {
    // If you wish to turn OFF background-tracking, call the #stop method.
    this.backgroundGeolocation.stop();
    this.backgroundGeolocation.finish();
    this.backgroundGeolocation.removeAllListeners();
    this.trackState.next(false);
  }

  async presentToast() {
    const toast = await this.toastCtrl.create({
      message: 'Your location was successfully pushed',
      duration: 1000,
      position: 'bottom'
    });
    toast.onDidDismiss();
    toast.present();
  }

  clear() {
    localStorage.clear();
  }

  getItem(key: string): any {
    return JSON.parse(JSON.stringify(localStorage.getItem(key)));
  }

  removeItem(key: string): void {
    localStorage.removeItem(key);
  }

  setItem(key: string, value: any): void {
    localStorage.setItem(key, JSON.stringify(value));
  }
}
