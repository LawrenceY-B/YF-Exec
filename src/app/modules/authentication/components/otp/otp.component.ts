import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxOtpInputConfig, NgxOtpStatus } from 'ngx-otp-input';
import { timer, Subscription } from 'rxjs';
import { map, takeWhile } from 'rxjs/operators';


@Component({
  selector: 'app-otp',
  templateUrl: './otp.component.html',
  styleUrls: ['./otp.component.scss'],
})
export class OtpComponent implements OnInit {
  submitted: boolean = false;
  disabled: boolean = true;

  resend: boolean = false;
  status: NgxOtpStatus | null = null;
  OTP = '';
  Time:number=300

  constructor(private router: Router) {}
  

  ngOnInit() {
  }

 
  
  trial(event: any) {
    this.OTP = event;
    this.OTP.length === 6
      ? (this.disabled = !this.disabled)
      : (this.disabled = true);
    console.log(this.disabled);
    console.log(this.OTP);
  }
  onSubmit(): void {
    this.submitted = !this.submitted;
    setTimeout(() => {
      this.OTP === '123456'
        ? (this.status = 'success')
        : (this.status = 'error');
      if (this.status === 'success') this.router.navigate(['auth/verified']);
      if (this.status === 'error') {
        console.log('soryyyyy');
      }
      this.submitted = false;
    }, 3000);
    console.log('Submitted');
  }
  resendOTP() {
    this.resend = !this.resend;
    setTimeout(() => {
      this.resend = false;
    }, 3000);
  }
  otpInputConfig: NgxOtpInputConfig = {
    otpLength: 6,
    autofocus: true,
    isPasswordInput: true,
    autoblur: true,
    numericInputMode: false,
    classList: {
      inputBox: 'otp-input',
      input: 'otp-input-field',
      inputFilled: 'otp-input-field-filled',
      inputDisabled: 'otp-input-field-disabled',
      inputError: 'otp-input-field-error',
    },
  };
  
}
