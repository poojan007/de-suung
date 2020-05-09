import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { IncidentAlertPage } from './incident-alert.page';

describe('IncidentAlertPage', () => {
  let component: IncidentAlertPage;
  let fixture: ComponentFixture<IncidentAlertPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IncidentAlertPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(IncidentAlertPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
