import { Component, OnInit } from '@angular/core';
import { CallNumber } from '@ionic-native/call-number/ngx';
import { EmailComposer } from '@ionic-native/email-composer/ngx';

@Component({
  selector: 'app-contactus',
  templateUrl: './contactus.page.html',
  styleUrls: ['./contactus.page.scss'],
})
export class ContactusPage implements OnInit {

  constructor(
    private callNumber: CallNumber,
    private emailComposer: EmailComposer
  ) { }

  ngOnInit() {
  }

  // tslint:disable-next-line: variable-name
  call(number) {
    this.callNumber.callNumber(number, true)
    .then(res => console.log('Launched dialer!', res))
    .catch(err => console.log('Error launching dialer', err));
  }

  sendEmail() {
    this.emailComposer.isAvailable().then((available: boolean) => {
      if (available) {}
     });

    const email = {
       to: 'desuung11@gmail.com',
       subject: 'Desuung App Issues',
       body: 'Please write your email here',
       isHtml: true
     };
     // Send a text message using default options
    this.emailComposer.open(email);
  }
}
