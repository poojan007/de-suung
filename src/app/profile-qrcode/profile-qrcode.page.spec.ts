import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ProfileQrcodePage } from './profile-qrcode.page';

describe('ProfileQrcodePage', () => {
  let component: ProfileQrcodePage;
  let fixture: ComponentFixture<ProfileQrcodePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileQrcodePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ProfileQrcodePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
