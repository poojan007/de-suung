import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EntertainmentPage } from './entertainment.page';

describe('EntertainmentPage', () => {
  let component: EntertainmentPage;
  let fixture: ComponentFixture<EntertainmentPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EntertainmentPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EntertainmentPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
