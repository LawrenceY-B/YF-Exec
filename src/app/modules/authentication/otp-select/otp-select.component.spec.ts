import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OtpSelectComponent } from './otp-select.component';

describe('OtpSelectComponent', () => {
  let component: OtpSelectComponent;
  let fixture: ComponentFixture<OtpSelectComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OtpSelectComponent]
    });
    fixture = TestBed.createComponent(OtpSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
