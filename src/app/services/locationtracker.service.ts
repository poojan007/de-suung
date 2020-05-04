import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
// tslint:disable-next-line: max-line-length
import { BackgroundGeolocation, BackgroundGeolocationConfig, BackgroundGeolocationResponse } from '@ionic-native/background-geolocation/ngx';

@Injectable({
  providedIn: 'root'
})
export class LocationtrackerService {

  trackState = new BehaviorSubject(false);
  watch: any;
  lat: number;
  lng: number;
  bearing: number;
  speed: number;

  config: BackgroundGeolocationConfig = {
    desiredAccuracy: 10,
    stationaryRadius: 20,
    distanceFilter: 30,
    debug: true, //  enable this hear sounds for background-geolocation life-cycle.
    stopOnTerminate: false, // enable this to clear background location settings when the app terminates
    interval: 2000
  };

  constructor(
    public backgroundGeolocation: BackgroundGeolocation
  ) {}

  startBackgroundGeolocation() {
    this.backgroundGeolocation.configure(this.config)
      .then((location: BackgroundGeolocationResponse) => {
        this.backgroundGeolocation.finish(); // FOR IOS ONLY
    });
    // start recording location
    this.backgroundGeolocation.start();
    this.trackState.next(true);
  }

  stopBackgroundGeolocation() {
    // If you wish to turn OFF background-tracking, call the #stop method.
    this.backgroundGeolocation.stop();
    this.trackState.next(false);
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
