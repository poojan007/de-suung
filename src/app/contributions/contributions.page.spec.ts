import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ContributionsPage } from './contributions.page';

describe('ContributionsPage', () => {
  let component: ContributionsPage;
  let fixture: ComponentFixture<ContributionsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContributionsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ContributionsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
