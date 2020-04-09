import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.page.html',
  styleUrls: ['./create-event.page.scss'],
})
export class CreateEventPage implements OnInit {

  eventTitle: string;
  eventCategory: string;
  eventType: string;
  eventDetail: string;
  dzongkhag: string;
  gewog: string;
  startDate: string;
  endDate: string;
  startTime: string;
  endTime: string;
  inviteDesuupsFrom: string;
  inviteDesuupsBatch: string;
  coordinator: string;
  expectedWorkingDay: number;
  totalDesuupsRequired: number;

  constructor() { }

  ngOnInit() {
  }

}
