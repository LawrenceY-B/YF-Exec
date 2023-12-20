import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-planner',
  templateUrl: './planner.component.html',
  styleUrls: ['./planner.component.scss'],
})
export class PlannerComponent implements OnInit {
  constructor(private router: Router) {}
  ngOnInit(): void {
    const data = localStorage.getItem('planner');
    console.log(data);
    if (data ===  null) {
      console.log('no data');
      this.router.navigate(['/dashboard/empty']);
    }
  }
}
