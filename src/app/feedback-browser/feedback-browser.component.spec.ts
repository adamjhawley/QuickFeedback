import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedbackBrowserComponent } from './feedback-browser.component';

describe('FeedbackBrowserComponent', () => {
  let component: FeedbackBrowserComponent;
  let fixture: ComponentFixture<FeedbackBrowserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FeedbackBrowserComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FeedbackBrowserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
