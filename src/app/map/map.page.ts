import { Component, OnInit, ElementRef, ViewChildren} from '@angular/core';
import { Platform, ToastController, NavController } from '@ionic/angular';
import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  Marker,
  MyLocation,
  GoogleMapOptions,
  Spherical,
  LatLngBounds,
  MarkerOptions,
  GoogleMapsAnimation
} from '@ionic-native/google-maps';
import {
  NativeGeocoder,
  NativeGeocoderOptions
} from '@ionic-native/native-geocoder/ngx';
import { ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.scss'],
})
export class MapPage implements OnInit {

  @ViewChildren('directionsPanel') directionsPanel: ElementRef;

  map: GoogleMap;
  incidentAddress: string;
  incidentLatitude: number;
  incidentLongitude: number;
  myLatitude: number;
  myLongitude: number;
  myAddress: string;
  myDistance: number;
  items: any;

  constructor(
    public platform: Platform,
    private nativeGeocoder: NativeGeocoder,
    private toastCtrl: ToastController,
    private authService: AuthenticationService,
    private navCtrl: NavController
  ) {
    this.items = JSON.parse(authService.getItem('latlng'));
    console.log(JSON.stringify(this.items));
    this.incidentLatitude = this.items.latitude;
    this.incidentLongitude = this.items.longitude;
  }

  ngOnInit() {
    this.platform.ready().then(() => this.loadMap());
  }

  back() {
    this.navCtrl.back();
  }

  loadMap() {
    const mapOptions: GoogleMapOptions = {
      camera: {
         target: {
           lat: this.incidentLatitude,
           lng: this.incidentLongitude
         },
         zoom: 17,
         tilt: 30
       },
       controls: {
         compass: true,
         myLocationButton: true,
         myLocation: true,
         zoom: true,
         mapToolbar: true
       }
    };

    this.map = GoogleMaps.create('map_canvas', mapOptions);

    const marker: Marker = this.map.addMarkerSync({
      title: this.incidentAddress,
      icon: 'red',
      animation: 'DROP',
      position: {
        lat: this.incidentLatitude,
        lng: this.incidentLongitude
      }
    });
    marker.on(GoogleMapsEvent.MARKER_CLICK).subscribe(() => {});

    // Getting the incident address
    this.getAddressFromCoords(this.incidentLatitude, this.incidentLongitude, 'INCIDENT');

    // Getting my current position
    this.getMyLocation();

    this.getDistance();
  }

  getMyLocation() {
    this.map.getMyLocation().then((location: MyLocation) => {
      this.myLatitude = location.latLng.lat;
      this.myLongitude = location.latLng.lng;
      this.getAddressFromCoords(location.latLng.lat, location.latLng.lng, 'MY_ADDRESS');
    })
    .catch(err => {
      this.showToast(err.error_message);
    });
  }

  getAddressFromCoords(latitude, longitude, type) {
    let address: string;
    const options: NativeGeocoderOptions = {
      useLocale: true,
      maxResults: 1
    };
    this.nativeGeocoder.reverseGeocode(latitude, longitude, options)
    .then((result) => {
      address = '';
      const response = JSON.parse(JSON.stringify(result[0]));
      address = response.administrativeArea + ',' + response.thoroughfare;
      if (type === 'INCIDENT') {
        this.incidentAddress = address;
      } else {
        this.myAddress = address;
      }
    })
    .catch((error: any) => {
      this.showToast(error.error_message);
    });
  }

  getDistance() {
    this.myDistance = Spherical.computeDistanceBetween(
      {lat: this.myLatitude, lng: this.myLongitude},
      {lat: this.incidentLatitude, lng: this.incidentLongitude}
    );
  }

  getDirection() {
    // tslint:disable-next-line: max-line-length
    window.open('https://maps.googleapis.com/maps/api/directions/json?key=AIzaSyA2OR9NCts43D7CLtAxovY1zonifMtMVis&origin=' + this.myLatitude + ',' + this.myLongitude + '&destination=' + this.incidentLatitude + ',' + this.incidentLongitude);

    // this.platform.ready().then(() => {
    //   const routePoints = [
    //     {lat: this.myLatitude, lng: this.myLongitude},
    //     {lat: this.incidentLatitude, lng: this.incidentLongitude}
    //   ];

    //   const latLngPointBounds = new LatLngBounds(routePoints);
    //   const mapOptions: GoogleMapOptions = {
    //       camera: {
    //         target: latLngPointBounds.getCenter(),
    //         zoom: 20
    //       },
    //       controls: {
    //         compass: true,
    //         myLocationButton: true,
    //         myLocation: true,
    //         zoom: true,
    //         mapToolbar: true
    //       }
    //     };
    //   this.map = GoogleMaps.create('map_canvas', mapOptions);

    //   this.map.one(GoogleMapsEvent.MAP_READY).then(() => {
    //       this.map.addPolyline({
    //         points: routePoints,
    //         color: '#AA00FF',
    //         width: 4,
    //         geodesic: true
    //       }).then((resp) => {
    //         const incidentMarkerOptions: MarkerOptions = {
    //           title: this.incidentAddress,
    //           position: routePoints[routePoints.length - 1],
    //           animation: GoogleMapsAnimation.BOUNCE
    //         };
    //         this.map.addMarker(incidentMarkerOptions).then((marker: Marker) => {
    //           marker.showInfoWindow();
    //         });
    //       });
    //     });
    // });
  }

  async showToast(msg: string) {
    const toast = await this.toastCtrl.create({
      message: msg,
      duration: 2000,
      position: 'middle'
    });
    toast.present();
  }
}
