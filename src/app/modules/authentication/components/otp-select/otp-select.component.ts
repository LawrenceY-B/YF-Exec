import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-otp-select',
  templateUrl: './otp-select.component.html',
  styleUrls: ['./otp-select.component.scss'],
})
export class OtpSelectComponent implements OnInit {
  sendviaEmail: string = 'Email';
  email = 'lawrencekybj@gmail.com';
  phoneNumber = '0243914722';
  submitted: boolean = false;

  constructor(private router: Router) {}
  ngOnInit(): void {
    this.hidePhone();
    this.hideEmail();
  }
 
  onSubmit(): void {
    this.submitted = !this.submitted;
    setTimeout(() => {
      this.submitted = false;
      this.router.navigate(['auth/OTP']);
    },3000)
    console.log('Submitted');
  }
  toggleEmail(): void {
    this.sendviaEmail = 'Email';
  }
  togglePhoneNumber(): void {
    this.sendviaEmail = 'Phone Number';
  }
  hidePhone() {
    let first = this.phoneNumber.charAt(0);
    let lastTwo = this.phoneNumber.slice(
      this.phoneNumber.length - 2,
      this.phoneNumber.length
    );
    let mid = this.phoneNumber.slice(1, this.phoneNumber.length - 2);
    let midnumber = mid.replace(/[0-9]/g, '*');
    this.phoneNumber = first + midnumber + lastTwo;
  }
  hideEmail() {
    let first = this.email.charAt(0);
    let end = this.email.indexOf('@');
    let lastValues = this.email.slice(end - 2, this.email.length);
    let mid = this.email.slice(1, end - 2);
    let midnumber = mid.replace(/[a-z]/g, '*');
    this.email = first + midnumber + lastValues;
  }

  button: any = {
    'border-radius': '100%',
    border: '2px solid var(--button-color)',
    height: '18px',
    width: '18px',
    display: 'flex',
    'align-items': 'center',
    'justify-content': 'center',
  };
}
