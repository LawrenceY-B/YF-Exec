import { Component, OnInit } from '@angular/core';
import {  Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  submitted: boolean = false;
  constructor(private router: Router) { }
  ngOnInit(): void {
  
  }
  onSubmit(): void {
    this.submitted=!this.submitted;

    setTimeout(() => {
      this.submitted = false;
      this.router.navigate(['auth/OTPmode']);
    }, 3000);
    console.log("Submitted")
  }
}
