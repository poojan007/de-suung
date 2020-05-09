import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { ApiModel } from '../model/api-model';
import { ApiService } from '../services/api.service';
import { LocationtrackerService } from '../services/locationtracker.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  data: ApiModel;
  name: string;
  did: string;
  photoUrl: string;
  trackLocation: boolean;

  constructor(
    private authService: AuthenticationService,
    private apiService: ApiService,
    private locationService: LocationtrackerService
  ) {
    this.data = new ApiModel();
  }

  ngOnInit() {
    this.trackLocation = this.locationService.getItem('track_me');
    const userData = JSON.parse(this.authService.getItem('USER_INFO'));
    this.data.userId = userData.userId;

    this.apiService.getProfile(this.data).subscribe((response) => {
      this.name = response[0].userName;
      this.did = response[0].did;
      this.photoUrl = response[0].photo;
    });
  }

  toggleLocationTracking() {
    this.locationService.setItem('track_me', this.trackLocation);
    if (!this.trackLocation) {
      this.locationService.setItem('track_me', false);
      this.locationService.stopBackgroundGeolocation();
    } else {
      this.locationService.startBackgroundGeolocation(this.data.userId);
    }
  }
}
