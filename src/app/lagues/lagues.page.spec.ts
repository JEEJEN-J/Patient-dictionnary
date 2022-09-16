import {ComponentFixture , TestBed , waitForAsync} from '@angular/core/testing';
import {IonicModule} from '@ionic/angular';

import {LaguesPage} from './lagues.page';

describe('LaguesPage' , () => {
  let component: LaguesPage;
  let fixture: ComponentFixture<LaguesPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [LaguesPage] ,
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(LaguesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create' , () => {
    expect(component).toBeTruthy();
  });
});
