import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { resolve } from 'url';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  basePath = 'http://202.144.139.70/desungAPI/index.php?apiType=';
  private userData: any;

  constructor(
    private http: HttpClient
  ) { }

  // Http Options
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  // Handle API errors
  handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  }

  validateLogin(item) {
    return this.http
      .get<any>(this.basePath + 'userValidation&loginId=' + item.loginId + '&password=' + item.password, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      );
  }

  register(item) {
    return this.http
      // tslint:disable-next-line: max-line-length
      .post<any>(this.basePath + 'userRegistration&name=' + item.name + '&email=' + item.email + '&did=' + item.did + '&cid=' + item.cid + '&created_by=0', this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      );
  }

  getUpcomingEvents(item) {
    return this.http
      .get<any>(this.basePath + 'userEventList&userId=' + item.userId, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      );
  }

  getRegisteredEvents(item) {
    return this.http
      .get<any>(this.basePath + 'registeredEventList&userId=' + item.userId, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      );
  }

  getContributions(item) {
    return this.http
      .get<any>(this.basePath + 'myContribution&userId=' + item.userId, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      );
  }

  getProfile(item) {
    return this.http
      .get<any>(this.basePath + 'viewProfile&userId=' + item.userId, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      );
  }

  getDzongkhagList() {
    return this.http
      .get<any>(this.basePath + 'getDzongkhagList', this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      );
  }

  cancelEvent(item) {
    return this.http
    .get<any>(this.basePath + 'eventCancellation&userId=' + item.userId + '&eventId=' + item.eventId, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      );
  }

  getEventDetails(eventId) {
    return this.http
    .get<any>(this.basePath + 'eventDetails&event_id=' + eventId, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      );
  }

  registerForEvent(item) {
    return this.http
    .get<any>(this.basePath + 'eventRegistration&eventId=' + item.eventId + '&userId=' + item.userId, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      );
  }

  getCoordinatorEventList(item) {
    return this.http
    .get<any>(this.basePath + 'coordinatorEventList&userId=' + item.userId, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      );
  }

  getRegisteredDesuupList(eventId) {
    return this.http
    .get<any>(this.basePath + 'geteventAttendanceList&event_id=' + eventId, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      );
  }

  getDropDownList(tableName, paramId, colName) {
    return this.http
    .get<any>(this.basePath + 'populateDropDown&tableName=' + tableName + '&paramId=' + paramId + '&colName=' + colName, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      );
  }

  getBatchList() {
    return this.http
    .get<any>(this.basePath + 'getBatchList', this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      );
  }

  createEvent(item) {
    return this.http
    .post<any>(this.basePath + 'createEvent', JSON.stringify(item), this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      );
  }
}
