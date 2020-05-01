import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DesuungShopPage } from './desuung-shop.page';

describe('DesuungShopPage', () => {
  let component: DesuungShopPage;
  let fixture: ComponentFixture<DesuungShopPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DesuungShopPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DesuungShopPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
