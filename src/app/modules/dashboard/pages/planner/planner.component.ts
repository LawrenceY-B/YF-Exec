import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { IActivity } from 'src/app/shared/models/activity.model';
import { NonNullableFormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-planner',
  templateUrl: './planner.component.html',
  styleUrls: ['./planner.component.scss'],
})
export class PlannerComponent implements OnInit {
  @Input() plannerReceiver: IActivity[] = [];
  constructor(private router: Router, private fb: NonNullableFormBuilder) {}
  displayedColumns: string[] = ['Date', 'Activity', 'Leaders', 'Synopsis'];

  ngOnInit(): void {
    const data = localStorage.getItem('planner');
    if (data === null) {
      console.log('no data');
      this.router.navigate(['/dashboard/empty']);
    }
    const detail = localStorage.getItem('timetable');
    if (detail) {
      this.plannerReceiver = JSON.parse(detail);
    } else {
      this.plannerReceiver = [];
    }
  }
  receivePlanner(event: IActivity) {
    this.plannerReceiver.push(event);
    localStorage.setItem('timetable', JSON.stringify(this.plannerReceiver));
    console.log(this.plannerReceiver);
  }
}
