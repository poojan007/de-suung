import { Component, OnInit, ViewChild } from '@angular/core';
import { Howl } from 'howler';
import { IonRange, ActionSheetController, NavController, PopoverController } from '@ionic/angular';
import { CommonpopoverComponent } from '../component/commonpopover/commonpopover.component';

export interface Track {
  name: string;
  path: string;
}

@Component({
  selector: 'app-listen',
  templateUrl: './listen.page.html',
  styleUrls: ['./listen.page.scss'],
})
export class ListenPage implements OnInit {

  playlist: Track[] = [
    {
      name: 'Zhabten to His Majesty the Fifth King',
      path: './assets/mp3/zhabten.mp3'
    },
    {
      name: 'Desuung Honour Code',
      path: './assets/mp3/code-of-honor.mp3'
    }
  ];

  activeTrack: Track = null;
  player: Howl = null;
  isPlaying = false;
  progress = 0;

  @ViewChild('range', { static: false }) range: IonRange;

  constructor(
    private actionSheetController: ActionSheetController,
    private navCtrl: NavController,
    private popoverController: PopoverController
  ) { }

  ngOnInit() {
  }

  start(track: Track) {
    if (this.player) {
      this.player.stop();
    }
    this.player = new Howl({
      src: [track.path],
      html5: true,
      onplay: () => {
        this.isPlaying = true;
        this.activeTrack = track;
        this.updateProgress();
      },
      onend: () => {

      }
    });
    this.player.play();
  }

  togglePlayer(pause) {
    this.isPlaying = !pause;
    if (pause) {
      this.player.pause();
    } else {
      this.player.play();
    }
  }

  next() {
    const index = this.playlist.indexOf(this.activeTrack);
    if (index !== this.playlist.length - 1 ) {
      this.start(this.playlist[index + 1]);
    } else {
      this.start(this.playlist[0]);
    }
  }

  prev() {
    const index = this.playlist.indexOf(this.activeTrack);
    if (index > 0) {
      this.start(this.playlist[index - 1]);
    } else {
      this.start(this.playlist[this.playlist.length - 1 ]);
    }
  }

  seek() {
    const newValue = +this.range.value;
    const duration = this.player.duration();
    this.player.seek(duration * (newValue / 100));
  }

  updateProgress() {
    const seek = this.player.seek();
    this.progress = (seek / this.player.duration()) * 100 || 0;
    setTimeout(() => {
      this.updateProgress()
    }, 1000);
  }

  async presentPopover(ev: any) {
    const popover = await this.popoverController.create({
      component: CommonpopoverComponent,
      cssClass: 'my-custom-class',
      event: ev,
      translucent: true
    });
    return await popover.present();
  }

  async presentActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Actions',
      buttons: [{
        text: 'Settings',
        icon: 'cog',
        handler: () => {
          this.navCtrl.navigateForward('settings');
        }
      }, {
        text: 'Logout',
        icon: 'log-out',
        handler: () => {
          this.navCtrl.navigateForward('/logout');
        }
      }, {
        text: 'Close',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();
  }

  ionViewWillLeave() {
    this.togglePlayer(true);
  }

  back() {
    this.togglePlayer(true);
    this.navCtrl.back();
  }
}
