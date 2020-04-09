import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { Platform, ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  authState = new BehaviorSubject(false);

  constructor(
    private router: Router,
    private platform: Platform,
    public toastController: ToastController
    ) {}

  ifLoggedIn() {
    this.getItem('USER_INFO').then((response) => {
      if (response) {
        this.authState.next(true);
      }
    });
  }

  login(item) {
    this.setItem('USER_INFO', item);
    this.authState.next(true);
  }

  logout() {
    this.removeItem('USER_INFO');
    this.authState.next(false);
  }

  isAuthenticated() {
    return this.authState.value;
  }

  clear() {
    localStorage.clear();
  }

  getItem(key: string): any {
    return JSON.parse(JSON.stringify(localStorage.getItem(key)));
  }

  removeItem(key: string): void {
    localStorage.removeItem(key);
  }

  setItem(key: string, value: any): void {
    localStorage.setItem(key, JSON.stringify(value));
  }
}
