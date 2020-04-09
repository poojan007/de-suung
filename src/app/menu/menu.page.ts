import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {

  pages = [
    {
      title: 'Dashboard',
      url: '/menu/dashboard',
      icon: 'home'
    },
    {
      title: 'Change Pin',
      url: '/menu/changepin',
      icon: 'key'
    }
  ];

  constructor(
    private authService: AuthenticationService,
    private navCtrl: NavController
  ) { }

  ngOnInit() {
    console.log('inside menu page');
  }

  logout() {
    this.authService.logout();
    this.navCtrl.navigateForward('');
  }
}
