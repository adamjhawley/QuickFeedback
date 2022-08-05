import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatePointFormComponent } from './create-point-form.component';

describe('CreatePointFormComponent', () => {
  let component: CreatePointFormComponent;
  let fixture: ComponentFixture<CreatePointFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreatePointFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreatePointFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
