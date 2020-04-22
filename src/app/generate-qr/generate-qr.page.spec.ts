import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { GenerateQrPage } from './generate-qr.page';

describe('GenerateQrPage', () => {
  let component: GenerateQrPage;
  let fixture: ComponentFixture<GenerateQrPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GenerateQrPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(GenerateQrPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
