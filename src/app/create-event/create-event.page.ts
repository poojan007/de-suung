import { Component, OnInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { ApiService } from '../services/api.service';
import { ApiModel } from '../model/api-model';
import { LoadingController, AlertController } from '@ionic/angular';
import { DatePicker } from '@ionic-native/date-picker/ngx';
import { CreateEventModel } from '../model/create-event-model';
import { DatePipe } from '@angular/common';
import { IonicSelectableComponent } from 'ionic-selectable';
import { Subscription } from 'rxjs';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { NativeGeocoder, NativeGeocoderResult, NativeGeocoderOptions } from '@ionic-native/native-geocoder/ngx';

declare var google;

@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.page.html',
  styleUrls: ['./create-event.page.scss'],
})
export class CreateEventPage implements OnInit {

  eventTitle: string;
  eventCategory: number;
  eventType: number;
  eventDetail: string;
  dzongkhag: number;
  startDate: string;
  endDate: string;
  startTime: string;
  endTime: string;
  inviteDesuupsFrom: number;
  inviteDesuupsBatch: number;
  coordinator: number;
  expectedWorkingDay: number;
  totalDesuupsRequired: number;
  attendanceAssistant = 0;
  eventAreaRadius: number;
  eventLatitude: number;
  eventLongitude: number;
  profession: number;

  data: ApiModel;
  createEventModel: CreateEventModel;
  loaderToShow: any;

  eventCategoryList: any;
  eventTypeList: any;
  dzongkhagList: any;
  desuupBatchList: any;
  coordinatorList: any;
  desuupList: any;
  occupationGroupList: any;
  desuupArray: [];

  status: string;
  message: string;
  toggle = true;
  toggleBatch = true;

  desuupSubscription: Subscription;

  @ViewChild('map',  {static: false}) mapElement: ElementRef;
  map: any;
  address: string;
  lat: string;
  long: string;
  autocomplete: { input: string; };
  autocompleteItems: any[];
  location: any;
  placeid: any;
  GoogleAutocomplete: any;

  @ViewChild('inviteDesuupFromComponent', null) inviteDesuupFromComponent: IonicSelectableComponent;
  @ViewChild('inviteBatchComponent', null) inviteBatchComponent: IonicSelectableComponent;

  constructor(
    private authService: AuthenticationService,
    private apiService: ApiService,
    private loadingCtrl: LoadingController,
    private datePicker: DatePicker,
    private datePipe: DatePipe,
    private alertCtrl: AlertController,
    private geolocation: Geolocation,
    private nativeGeocoder: NativeGeocoder,
    public zone: NgZone
  ) {
    this.data = new ApiModel();
    this.createEventModel = new CreateEventModel();

    this.GoogleAutocomplete = new google.maps.places.AutocompleteService();
    this.autocomplete = { input: '' };
    this.autocompleteItems = [];
  }

  ngOnInit() {
    this.showLoader();
    const userData = JSON.parse(this.authService.getItem('USER_INFO'));
    this.data.userId = userData.userId;

    this.getDropDownList('eventCategory', 'event_categories', 'NA', 'NA');
    this.getDropDownList('dzongkhag', 'dzongkhags', 'NA', 'NA');
    this.getDropDownList('coordinators', 'users', '2', 'userType');
    this.getDropDownList('professionList', 'professions', 'NA', 'NA');
    this.getBatchList();

    this.loadMap();

    this.hideLoader();
  }

  getDropDownList(requestType, tableName, paramId, colName) {
    this.apiService.getDropDownList(tableName, paramId, colName).subscribe((response) => {
      if (requestType === 'eventCategory') {
        this.eventCategoryList = response;
      } else if (requestType === 'dzongkhag') {
        this.dzongkhagList = response;
      } else if (requestType === 'coordinators') {
        this.coordinatorList = response;
      } else if (requestType === 'eventTypes') {
        this.eventTypeList = response;
      } else if (requestType === 'professionList') {
        this.occupationGroupList = response;
      }
    });
  }

  getBatchList() {
    this.apiService.getBatchList().subscribe((response) => {
      this.desuupBatchList = response;
    });
  }

  getEventTypes($event) {
    const paramId = $event.target.value;
    this.getDropDownList('eventTypes', 'event_types', paramId, 'event_category');
  }

  createEvent() {
    this.createEventModel.title = this.eventTitle;
    this.createEventModel.eventCategory_id = this.eventCategory;
    this.createEventModel.eventType_id = this.eventType;
    this.createEventModel.description = this.eventDetail;
    this.createEventModel.dzongkhag_id = this.dzongkhag;
    this.createEventModel.startDate = this.datePipe.transform(this.startDate, 'yyyy-MM-dd');
    this.createEventModel.endDate = this.datePipe.transform(this.endDate, 'yyyy-MM-dd');
    this.createEventModel.startTime = this.datePipe.transform(this.startTime, 'HH:mm');
    this.createEventModel.endTime = this.datePipe.transform(this.endTime, 'HH:mm');
    this.createEventModel.invited_from = this.inviteDesuupsFrom;
    this.createEventModel.invited_batch = this.inviteDesuupsBatch;
    this.createEventModel.coordinator_id = this.coordinator;

    const date1: any = new Date(this.startDate);
    const date2: any = new Date(this.endDate);
    const diffDays: any = Math.floor((date2 - date1) / (1000 * 60 * 60 * 24));

    this.createEventModel.expected_working_days = diffDays;
    this.createEventModel.total_desuup_required = this.totalDesuupsRequired;
    this.createEventModel.attendance_assistant = this.attendanceAssistant;
    this.createEventModel.createdBy = this.data.userId;

    console.log(JSON.stringify(this.createEventModel));

    this.apiService.createEvent(this.createEventModel).subscribe((response) => {
      if (response.RESULT === 'SUCCESS') {
        this.status = 'Success';
        this.message = 'Event has been created successfully';
        this.presentAlert();
      } else {
        this.status = 'Failure';
        this.message = 'Event couldnot be added, please try again later';
        this.presentAlert();
      }
    });
  }

  showLoader() {
    this.loaderToShow = this.loadingCtrl.create({
      message: 'Please wait, loading details'
    }).then((res) => {
      res.present();
      res.onDidDismiss().then((dis) => {});
    });
    this.hideLoader();
  }

  hideLoader() {
    setTimeout(() => {
      this.loadingCtrl.dismiss();
    }, 1000);
  }

  async presentAlert() {
      const alert = await this.alertCtrl.create({
      header: this.status.toUpperCase(),
      message: this.message,
      buttons: ['OK']
    });
      await alert.present();
  }

  clear() {
    this.inviteDesuupFromComponent.clear();
    this.inviteDesuupFromComponent.close();
  }

  toggleItems() {
    this.inviteDesuupFromComponent.toggleItems(this.toggle);
    this.toggle = !this.toggle;
  }

  confirm() {
    this.inviteDesuupFromComponent.confirm();
    this.inviteDesuupFromComponent.close();
  }

  clearBatch() {
    this.inviteBatchComponent.clear();
    this.inviteBatchComponent.close();
  }

  toggleBatchItems() {
    this.inviteBatchComponent.toggleItems(this.toggleBatch);
    this.toggleBatch = !this.toggleBatch;
  }

  confirmBatch() {
    this.inviteBatchComponent.confirm();
    this.inviteBatchComponent.close();
  }

  // LOADING THE MAP HAS 2 PARTS.
  loadMap() {
    // FIRST GET THE LOCATION FROM THE DEVICE.
    this.geolocation.getCurrentPosition().then((resp) => {
      const latLng = new google.maps.LatLng(resp.coords.latitude, resp.coords.longitude);
      const mapOptions = {
        center: latLng,
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      }

      // LOAD THE MAP WITH THE PREVIOUS VALUES AS PARAMETERS.
      this.getAddressFromCoords(resp.coords.latitude, resp.coords.longitude);
      this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
      this.map.addListener('tilesloaded', () => {
        console.log('accuracy',this.map, this.map.center.lat());
        this.getAddressFromCoords(this.map.center.lat(), this.map.center.lng());
        this.lat = this.map.center.lat();
        this.long = this.map.center.lng();
      });
    }).catch((error) => {
      console.log('Error getting location', error);
    });
  }

  getAddressFromCoords(lattitude, longitude) {
    console.log('getAddressFromCoords ' + lattitude + ' ' + longitude);
    const options: NativeGeocoderOptions = {
      useLocale: true,
      maxResults: 5
    };
    this.nativeGeocoder.reverseGeocode(lattitude, longitude, options)
      .then((result: NativeGeocoderResult[]) => {
        this.address = '';
        const responseAddress = [];
        for (let [key, value] of Object.entries(result[0])) {
          if (value.length > 0) {
            responseAddress.push(value);
          }
        }
        responseAddress.reverse();
        for (const value of responseAddress) {
          this.address += value + ', ';
        }
        this.address = this.address.slice(0, -2);
      })
      .catch((error: any) => {
        this.address = 'Address Not Available!';
      });
  }

  // FUNCTION SHOWING THE COORDINATES OF THE POINT AT THE CENTER OF THE MAP
  ShowCords() {
    alert('lat' + this.lat + ', long' + this.long);
  }

  // AUTOCOMPLETE, SIMPLY LOAD THE PLACE USING GOOGLE PREDICTIONS AND RETURNING THE ARRAY.
  UpdateSearchResults(){
    if (this.autocomplete.input == '') {
      this.autocompleteItems = [];
      return;
    }
    this.GoogleAutocomplete.getPlacePredictions({ input: this.autocomplete.input },
    (predictions, status) => {
      this.autocompleteItems = [];
      this.zone.run(() => {
        predictions.forEach((prediction) => {
          this.autocompleteItems.push(prediction);
        });
      });
    });
  }

  // wE CALL THIS FROM EACH ITEM.
  SelectSearchResult(item) {
    /// WE CAN CONFIGURE MORE COMPLEX FUNCTIONS SUCH AS UPLOAD DATA TO FIRESTORE OR LINK IT TO SOMETHING
    alert(JSON.stringify(item));
    this.placeid = item.place_id;
  }

  // lET'S BE CLEAN! THIS WILL JUST CLEAN THE LIST WHEN WE CLOSE THE SEARCH BAR.
  ClearAutocomplete(){
    this.autocompleteItems = [];
    this.autocomplete.input = '';
  }

  // SIMPLE EXAMPLE TO OPEN AN URL WITH THE PLACEID AS PARAMETER.
  GoTo() {
    return window.location.href = 'https://www.google.com/maps/search/?api=1&query=Google&query_place_id='+this.placeid;
  }
}
