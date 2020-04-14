import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { ApiService } from '../services/api.service';
import { ApiModel } from '../model/api-model';
import { LoadingController, AlertController } from '@ionic/angular';
import { DatePicker } from '@ionic-native/date-picker/ngx';
import { CreateEventModel } from '../model/create-event-model';
import { DatePipe } from '@angular/common';
import { IonicSelectableComponent } from 'ionic-selectable';
import { Subscription } from 'rxjs';
import { Desuup } from '../model/desuup';

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
  attendanceAssistant: number;

  data: ApiModel;
  createEventModel: CreateEventModel;
  loaderToShow: any;

  eventCategoryList: any;
  eventTypeList: any;
  dzongkhagList: any;
  desuupBatchList: any;
  coordinatorList: any;
  desuupList: any;
  desuupArray: [];

  status: string;
  message: string;
  toggle = true;

  desuupSubscription: Subscription;

  @ViewChild('inviteDesuupFromComponent', null) inviteDesuupFromComponent: IonicSelectableComponent;

  constructor(
    private authService: AuthenticationService,
    private apiService: ApiService,
    private loadingCtrl: LoadingController,
    private datePicker: DatePicker,
    private datePipe: DatePipe,
    private alertCtrl: AlertController
  ) {
    this.data = new ApiModel();
    this.createEventModel = new CreateEventModel();
  }

  ngOnInit() {
    this.showLoader();
    const userData = JSON.parse(this.authService.getItem('USER_INFO'));
    this.data.userId = userData.userId;

    this.getDropDownList('eventCategory', 'event_categories', 'NA', 'NA');
    this.getDropDownList('dzongkhag', 'dzongkhags', 'NA', 'NA');
    this.getDropDownList('coordinators', 'users', '2', 'userType');
    this.getDropDownList('desuupList', 'users', 'NA', 'NA');
    this.getBatchList();

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
      } else if (requestType === 'desuupList') {
        this.desuupList = response;
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
    this.createEventModel.expected_working_days = this.expectedWorkingDay;
    this.createEventModel.total_desuup_required = this.totalDesuupsRequired;
    this.createEventModel.attendance_assistant = this.attendanceAssistant;
    this.createEventModel.createdBy = this.data.userId;

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
    }, 2000);
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

  filterDesuups(desuups: Desuup[], text: string) {
    return desuups.filter(desuup => {
      return desuup.name.toLowerCase().indexOf(text) !== -1 ||
        desuup.did.toLowerCase().indexOf(text) !== -1;
    });
  }

  searchDesuups(event: {
    component: IonicSelectableComponent,
    text: string
  }) {
    const text = event.text.trim().toLowerCase();
    event.component.startSearch();

    // Close any running subscription.
    if (this.desuupSubscription) {
      this.desuupSubscription.unsubscribe();
    }

    if (!text) {
      // Close any running subscription.
      if (this.desuupSubscription) {
        this.desuupSubscription.unsubscribe();
      }

      event.component.items = [];
      event.component.endSearch();
      return;
    }

    this.apiService.desuups = this.desuupList;
    this.desuupSubscription = this.apiService.getDesuupsAsync().subscribe(desuups => {
      if (this.desuupSubscription.closed) {
        return;
      }

      event.component.items = this.filterDesuups(desuups, text);
      event.component.endSearch();
    });
  }
}
