import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-tor',
  templateUrl: './tor.page.html',
  styleUrls: ['./tor.page.scss'],
})
export class TorPage implements OnInit {

  torList: any;

  constructor(
    private apiService: ApiService
  ) { }

  ngOnInit() {
    this.getDropDownList('tor', 'NA', 'NA');
  }

  getDropDownList(tableName, paramId, colName) {
    this.apiService.getDropDownList(tableName, paramId, colName).subscribe((response) => {
      this.torList = response;
    });
  }
}
