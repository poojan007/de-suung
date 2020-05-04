import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TorPage } from './tor.page';

describe('TorPage', () => {
  let component: TorPage;
  let fixture: ComponentFixture<TorPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TorPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
