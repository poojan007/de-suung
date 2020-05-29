import { Injectable, NgZone } from '@angular/core';
import { BackgroundGeolocation, BackgroundGeolocationConfig } from '@ionic-native/background-geolocation/ngx';
import { Geoposition, Geolocation } from '@ionic-native/geolocation/ngx';

@Injectable({
  providedIn: 'root'
})
export class LocationTrackingService {

  public watch: any;
  public lat = 0;
  public lng = 0;


  constructor(
    public zone: NgZone,
    public backgroundGeolocation: BackgroundGeolocation,
    public geolocation: Geolocation
  ) {

  }

  public startTracking() {

    const config: BackgroundGeolocationConfig = {
      desiredAccuracy: 0,
      stationaryRadius: 20,
      distanceFilter: 10,
      debug: true,
      interval: 2000
    };

    this.backgroundGeolocation.configure(config).then((location) => {

      console.log('BackgroundGeolocation:  ' + location.latitude + ',' + location.longitude);

      // Update inside of Angular's zone
      this.zone.run(() => {
        this.lat = location.latitude;
        this.lng = location.longitude;
      });
    }, (err) => {
      console.log(err);
      });

    this.backgroundGeolocation.start();

    // Background tracking
    const options = {
      frequency: 3000,
      enableHighAccuracy: true
    };

    this.watch = this.geolocation.watchPosition(options).subscribe((position: Geoposition) => {
      console.log(position);

      this.zone.run(() => {
        this.lat = position.coords.latitude;
        this.lng = position.coords.longitude;
      });
    });
  }

  public stopTracking() {
    console.log('stopTracking');

    this.backgroundGeolocation.finish();
    this.watch.unsubscribe();
  }
}
