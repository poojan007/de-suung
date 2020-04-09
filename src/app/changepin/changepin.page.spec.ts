import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ChangepinPage } from './changepin.page';

describe('ChangepinPage', () => {
  let component: ChangepinPage;
  let fixture: ComponentFixture<ChangepinPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChangepinPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ChangepinPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
