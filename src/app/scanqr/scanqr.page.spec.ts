import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ScanqrPage } from './scanqr.page';

describe('ScanqrPage', () => {
  let component: ScanqrPage;
  let fixture: ComponentFixture<ScanqrPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScanqrPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ScanqrPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
