import { Component, OnInit } from '@angular/core';
import { CallNumber } from '@ionic-native/call-number/ngx';
import { EmailComposer } from '@ionic-native/email-composer/ngx';

@Component({
  selector: 'app-desuup-nearby',
  templateUrl: './desuup-nearby.page.html',
  styleUrls: ['./desuup-nearby.page.scss'],
})
export class DesuupNearbyPage implements OnInit {

  constructor(
    private callNumber: CallNumber,
    private emailComposer: EmailComposer
  ) { }

  ngOnInit() {
  }

  logDrag(item, mobileNo, emailId) {
    const percent = item.getSlidingPercent();
    if (percent > 0) {
      console.log('right side');
      this.call(mobileNo);
    } else {
      console.log('left side');
      this.email(emailId);
    }
  }

  // tslint:disable-next-line: variable-name
  call(number) {
    this.callNumber.callNumber(number, true)
    .then(res => console.log('Launched dialer!', res))
    .catch(err => console.log('Error launching dialer', err));
  }

  email(emailId) {
    this.emailComposer.isAvailable().then((available: boolean) => {
      if (available) {}
     });

    const email = {
       to: emailId,
       subject: 'Desuup Collaboration',
       body: 'Please write your email here',
       isHtml: true
     };
     // Send a text message using default options
    this.emailComposer.open(email);
  }
}
