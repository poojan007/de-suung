import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AppinfoPage } from './appinfo.page';

describe('AppinfoPage', () => {
  let component: AppinfoPage;
  let fixture: ComponentFixture<AppinfoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppinfoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AppinfoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
