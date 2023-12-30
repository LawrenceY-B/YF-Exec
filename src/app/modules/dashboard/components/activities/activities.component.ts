import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormGroup,
  NonNullableFormBuilder,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { IActivity, IProgramInfo } from 'src/app/shared/models/activity.model';

@Component({
  selector: 'app-activities',
  templateUrl: './activities.component.html',
  styleUrls: ['./activities.component.scss'],
})
export class ActivitiesComponent implements OnInit {
  ButtonCatgory: string[] = [];
  weeks: Date[] = [];
  @Output() plannerForm = new EventEmitter<IActivity>();

  constructor(
    private formBuilder: NonNullableFormBuilder,
    private router: Router
  ) {}
  ngOnInit(): void {
    const temp = localStorage.getItem('ButtonCatgory');
    const data = localStorage.getItem('planner');
    data === null && this.router.navigate(['/dashboard/empty']);
    const planner = JSON.parse(data as string) as IProgramInfo;

    if (temp) {
      this.ButtonCatgory = JSON.parse(temp);
    }
    const startdate = planner.ProgramStart;
    const enddate = planner.ProgramEnd;
    const start = new Date(startdate);
    const end = new Date(enddate);
    const DAY = 24 * 60 * 60 * 1000;
    const endValue = end.valueOf();

    for (
      let newStart = start.valueOf();
      newStart <= endValue;
      newStart += DAY * 7
    ) {
      const days: Date[] = [];

      for (let d = newStart; d < newStart + 7 * DAY; d += DAY) {
        const currentDay = new Date(d);
        if (currentDay.getDay() === 0) {
          // 0 corresponds to Sunday
          days.push(currentDay);
        }
      }

      days.map((day) => this.weeks.push(day));
    }
  }
  PlannerFormBuilder = this.formBuilder.group({
    Date: ['', Validators.required],
    Activity: ['', Validators.required],
    Synopsis: ['', Validators.required],
  });
  

   LeaderFormBuilder =this.formBuilder.group({
      Leaders: [''],
    });
    name: string[] = [];

 addLeader() {
  let leadername=this.LeaderFormBuilder.value.Leaders as string;
  this.name.push(leadername);
  this.LeaderFormBuilder.reset();
  localStorage.setItem('leadernames', JSON.stringify(this.name));
  const temp = localStorage.getItem('leadernames');
  if (temp) {
    this.name = JSON.parse(temp);
  }

 }

  ActivityFormBuilder = this.formBuilder.group({
    Activity: ['', Validators.required],
  });
  startDrag(event: any) {
    event.dataTransfer.setData('text/plain', event.target.textContent);
  }

  allowDrop(event: DragEvent) {
    event.preventDefault();
  }

  drop(event: DragEvent, control: AbstractControl) {
    event.preventDefault();
    const data = event.dataTransfer?.getData('text/plain') as string;
    control.setValue(data);
    console.log(`Dropped: ${data}`);

    // You can update your 'activities' array or perform any other actions with the dropped data.
  }


  Submit() {
    const data = this.ActivityFormBuilder.value.Activity as string;
    console.log(data);

    let temp = localStorage.getItem('ButtonCatgory');
    if (temp) {
      this.ButtonCatgory = JSON.parse(temp);
    }

    this.ButtonCatgory.push(data); // Add the new item to the ButtonCatgory array

    localStorage.setItem('ButtonCatgory', JSON.stringify(this.ButtonCatgory));

    this.ActivityFormBuilder.reset();
  }
  removeCategory(category: string) {
    this.ButtonCatgory = this.ButtonCatgory.filter((item) => item !== category);
    localStorage.setItem('ButtonCatgory', JSON.stringify(this.ButtonCatgory));
  }
  submitPlanner() {

    const data : IActivity ={
      date: new Date(this.PlannerFormBuilder.value.Date as string),
      activity: this.PlannerFormBuilder.value.Activity as string,
      synopsis: this.PlannerFormBuilder.value.Synopsis as string,
      leaders: this.name,
    }
    console.log(data)
    this.plannerForm.emit(data)
    this.PlannerFormBuilder.reset();
    localStorage.setItem('leadernames', '')
    this.name=[];
  }
}
