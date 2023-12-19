import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxOtpInputConfig, NgxOtpStatus } from 'ngx-otp-input';

@Component({
  selector: 'app-otp',
  templateUrl: './otp.component.html',
  styleUrls: ['./otp.component.scss']
})
export class OtpComponent implements OnInit {
  submitted: boolean = false;
  status:NgxOtpStatus | null = null;
  OTP=""
  // interface OTP{
  //   NgxOtpStatus = 'success' | 'error' | null;
  // }
  constructor(private router: Router) { }
  ngOnInit(): void {
  
  }
  onSubmit(): void {
    this.submitted=!this.submitted;
    setTimeout(() => {
     this.OTP==="123456"?this.status='success':this.status='error';
      if(this.status==='success')this.router.navigate(['auth/OTPmode']);
      if(this.status==='error'){console.log('soryyyyy')};
      this.submitted = false;

    }, 3000);
    console.log("Submitted")
  }
  otpInputConfig: NgxOtpInputConfig = {
    otpLength: 6,
    autofocus: true,
    isPasswordInput: false,
    autoblur: true,
    numericInputMode: true,
    classList: {
      inputBox: 'otp-input',
      input: 'otp-input-field',
      inputFilled: 'otp-input-field-filled',
      inputDisabled: 'otp-input-field-disabled',
      inputError: 'otp-input-field-error',
    },
  };
}
