import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ScanMovementPassPage } from './scan-movement-pass.page';

describe('ScanMovementPassPage', () => {
  let component: ScanMovementPassPage;
  let fixture: ComponentFixture<ScanMovementPassPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScanMovementPassPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ScanMovementPassPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
