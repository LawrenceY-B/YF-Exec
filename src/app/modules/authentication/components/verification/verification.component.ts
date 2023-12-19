import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-verification',
  templateUrl: './verification.component.html',
  styleUrls: ['./verification.component.scss']
})
export class VerificationComponent implements OnInit {
  timeLeft: number = 5;

  constructor(private router: Router) { }
  ngOnInit() {
    this.startCountdown();
    setTimeout(() => {
      this.router.navigate(['/dashboard/']);
    }, 5000);
  }
  startCountdown() {
    let interval = setInterval(() => {
      if(this.timeLeft > 0) {
        this.timeLeft--;
      } else {
        clearInterval(interval);
      }
    },1000)
  }
}
