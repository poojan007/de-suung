import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DesuupNearbyPage } from './desuup-nearby.page';

describe('DesuupNearbyPage', () => {
  let component: DesuupNearbyPage;
  let fixture: ComponentFixture<DesuupNearbyPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DesuupNearbyPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DesuupNearbyPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
