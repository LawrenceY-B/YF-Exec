import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CdkTableModule } from '@angular/cdk/table';
import { DataSource } from '@angular/cdk/collections';
import { Activity } from 'src/app/shared/models/activity.model';
import { NonNullableFormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-planner',
  templateUrl: './planner.component.html',
  styleUrls: ['./planner.component.scss'],
})
export class PlannerComponent implements OnInit {
  constructor(private router: Router,
    private fb: NonNullableFormBuilder) {}
  displayedColumns: string[] = ['Date', 'Activity', 'Leaders', 'Synopsis'];
  weeks : Date[]=[];
  ELEMENT_DATA: Activity[] = [
    {
      date: new Date('2023-07-01'),
      activity: 'Bible Study',
      leaders: 'John Doe',
      synopsis: 'This is a synopsis',
    },
    {
      date: new Date('2023-07-02'),
      activity: 'Bible Study',
      leaders: 'John Doe',
      synopsis: 'This is a synopsis',
    },
    {
      date: new Date('2023-07-03'),
      activity: 'Bible Study',
      leaders: 'John Doe',
      synopsis: 'This is a synopsis',
    },
  ];

  ngOnInit(): void {
    const data = localStorage.getItem('planner');
    console.log(data);
    if (data === null) {
      console.log('no data');
      this.router.navigate(['/dashboard/empty']);
    }
    data ? console.log(data) : console.log('no data');
    const start = new Date('2023-07-01');
      const end = new Date('2023-07-31');
      const DAY = 24 * 60 * 60 * 1000;
      const endValue = end.valueOf();
  
      for (let newStart = start.valueOf(); newStart <= endValue; newStart += DAY * 7) {
        const days: Date[] = [];
        
        for (let d = newStart; d < newStart + 7 * DAY; d += DAY) {
          const currentDay = new Date(d);
          if (currentDay.getDay() === 0) {
            // 0 corresponds to Sunday
            days.push(currentDay);
          }
        }
  
        days.map(day => this.weeks.push(day));
  
       
      }
  }
     PlannerFormBuilder = this.fb.group({
      Date: ['', Validators.required ],
      Activity: ['', Validators.required ],
      Leaders: ['', Validators.required],
      Synopsis: ['', Validators.required],
     })
   

  // activities: Activity[] = [
   
  // ];
  // ngOnInit(): void {
  //  

  //   console.log(this.weeks);
  //   console.log(this.activities);
  
    
  //   localStorage.getItem('ButtonCatgory');
   
  //     let temp = localStorage.getItem('ButtonCatgory');
  //     if (temp) {
  //       this.ButtonCatgory = JSON.parse(temp);
  //     } else {
  //       this.ButtonCatgory = [];
  //     }
    
    
  // }
  allowDrop(event: DragEvent) {
    event.preventDefault();
  }

  drop(event: DragEvent, x: HTMLInputElement) {
    event.preventDefault();
    const data = event.dataTransfer?.getData('text/plain') as string;
    x.value = data;
    console.log(`Dropped: ${data}`);
  }
}
