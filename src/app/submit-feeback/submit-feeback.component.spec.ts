import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmitFeebackComponent } from './submit-feeback.component';

describe('SubmitFeebackComponent', () => {
  let component: SubmitFeebackComponent;
  let fixture: ComponentFixture<SubmitFeebackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubmitFeebackComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubmitFeebackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
