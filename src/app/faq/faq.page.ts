import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.page.html',
  styleUrls: ['./faq.page.scss'],
})
export class FaqPage implements OnInit {

  faqList: any;

  constructor(
    private apiService: ApiService
  ) { }

  ngOnInit() {
    this.getDropDownList('faq', 'NA', 'NA');
  }

  getDropDownList(tableName, paramId, colName) {
    this.apiService.getDropDownList(tableName, paramId, colName).subscribe((response) => {
      this.faqList = response;
    });
  }

}
