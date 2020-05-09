import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError, delay } from 'rxjs/operators';
import { resolve } from 'url';
import { Desuup } from '../model/desuup';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  basePath = 'https://app.desuung.org.bt/desungAPI/index.php?apiType=';
  private userData: any;
  desuups: any;

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
      // tslint:disable-next-line: max-line-length
      .get<any>(this.basePath + 'userValidation&loginId=' + item.loginId + '&password=' + item.password + '&fcmToken=' + item.fcmToken, this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }

  register(item) {
    return this.http
      // tslint:disable-next-line: max-line-length
      .post<any>(this.basePath + 'userRegistration&name=' + item.name + '&email=' + item.email + '&did=' + item.did + '&cid=' + item.cid + '&created_by=0', this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }

  getUpcomingEvents(item) {
    return this.http
      // tslint:disable-next-line: max-line-length
      .get<any>(this.basePath + 'userEventList&userId=' + item.userId + '&locationId=' + item.location + '&batchNo=' + item.batchNo, this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }

  getRegisteredEvents(item) {
    return this.http
      .get<any>(this.basePath + 'registeredEventList&userId=' + item.userId, this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }

  getContributions(item) {
    return this.http
      .get<any>(this.basePath + 'myContribution&userId=' + item.userId, this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }

  getProfile(item) {
    return this.http
      .get<any>(this.basePath + 'viewProfile&userId=' + item.userId, this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }

  getDzongkhagList() {
    return this.http
      .get<any>(this.basePath + 'getDzongkhagList', this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }

  cancelEvent(item) {
    return this.http
    .get<any>(this.basePath + 'eventCancellation&userId=' + item.userId + '&eventId=' + item.eventId, this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }

  getEventDetails(eventId) {
    return this.http
    .get<any>(this.basePath + 'eventDetails&event_id=' + eventId, this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }

  registerForEvent(item) {
    return this.http
    .get<any>(this.basePath + 'eventRegistration&eventId=' + item.eventId + '&userId=' + item.userId, this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }

  getCoordinatorEventList(item) {
    return this.http
    .get<any>(this.basePath + 'coordinatorEventList&userId=' + item.userId, this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }

  getRegisteredDesuupList(eventId) {
    return this.http
    .get<any>(this.basePath + 'geteventAttendanceList&event_id=' + eventId, this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }

  getDropDownList(tableName, paramId, colName) {
    return this.http
    .get<any>(this.basePath + 'populateDropDown&tableName=' + tableName + '&paramId=' + paramId + '&colName=' + colName, this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }

  getBatchList() {
    return this.http
    .get<any>(this.basePath + 'getBatchList', this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }

  createEvent(item) {
    return this.http
    // tslint:disable-next-line: max-line-length
    .get<any>(this.basePath + 'createEvent&title=' + item.title + '&eventCategory_id=' + item.eventCategory_id + '&eventType_id=' + item.eventType_id + '&description=' + item.description + '&dzongkhag_id=' + item.dzongkhag_id + '&startDate=' + item.startDate + '&endDate=' + item.endDate + '&startTime=' + item.startTime + '&endTime=' + item.endTime + '&invited_from=' + item.invited_from + '&invited_batch=' + item.invited_batch + '&coordinator_id=' + item.coordinator_id + '&expected_working_days=' + item.expected_working_days + '&total_desuup_required=' + item.total_desuup_required + '&attendance_assistant=' + item.attendance_assistant + '&createdBy=' + item.createdBy, this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }

  postDesuupAttendance(attendanceStr) {
    return this.http
    .get<any>(this.basePath + 'saveAttendance&attendanceStr=' + attendanceStr, this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }

  postUpdateProfile(item) {
    return this.http
    // tslint:disable-next-line: max-line-length
    .get<any>(this.basePath + 'updateProfile&userId=' + item.userId + '&name=' + item.name + '&email=' + item.email + '&mobile=' + item.mobile + '&maritalStatus=' + item.maritalStatus + '&location=' + item.location + '&agencyType=' + item.agencyType + '&agencyId=' + item.agencyId + '&empType=' + item.empType + '&designation=' + item.designation + '&profession=' + item.profession + '&qualification=' + item.qualification, this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }

  postQRCodeAttendance(item) {
    return this.http
    // tslint:disable-next-line: max-line-length
    .get<any>(this.basePath + 'qrCodeAttendance&eventId=' + item.site + '&userId=' + item.uid + '&latitude=' + item.latitude + '&longitude=' + item.longitude, this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }

  postAvailableStatus(item) {
    return this.http
      // tslint:disable-next-line: max-line-length
      .get<any>(this.basePath + 'postAvailableStatus&userId=' + item.userId + '&latitude=' + item.latitude + '&longitude=' + item.longitude + '&dzongkhag=' + item.dzongkhag + '&locality=' + item.locality + '&exactLocation=' + item.exactLocation + '&availableStatus=' + item.availableStatus + '&altitude=' + item.altitude, this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }

  postIncidentAlert(item) {
    return this.http
    // tslint:disable-next-line: max-line-length
    .get<any>(this.basePath + 'incidentAlert&title=' + item.title + '&body=' + item.incidentMsg + '&type=INCIDENT_ALERT&latitude=' + item.latitude + '&longitude=' + item.longitude + '&altitude=' + item.altitude + '&userId=' + item.userId, this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }

  postBackgroundLocation(item) {
    return this.http
      // tslint:disable-next-line: max-line-length
      .get<any>(this.basePath + 'postAvailableStatus&userId=' + item.userId + '&latitude=' + item.latitude + '&longitude=' + item.longitude + '&dzongkhag=' + item.dzongkhag + '&locality=' + item.locality + '&exactLocation=' + item.exactLocation + '&availableStatus=AVAILABLE' + '&altitude=' + item.altitude, this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }

  sendOTP(mobile, otp) {
    return this.http
      .get<any>(this.basePath + 'sendOTP&mobile=' + mobile + '&otp=' + otp, this.httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  getDesuups(page?: number, size?: number): Desuup[] {
    let ports = [];
    console.log(this.desuups);
    this.desuups.forEach(desuup => {
        desuup.name = desuup;
        ports.push(desuup);
    });

    if (page && size) {
      ports = ports.slice((page - 1) * size, ((page - 1) * size) + size);
    }

    return ports;
  }

  getDesuupsAsync(page?: number, size?: number, timeout = 1000): Observable<Desuup[]> {
    return new Observable<Desuup[]>(observer => {
      observer.next(this.getDesuups(page, size));
      observer.complete();
    }).pipe(delay(timeout));
  }
}
