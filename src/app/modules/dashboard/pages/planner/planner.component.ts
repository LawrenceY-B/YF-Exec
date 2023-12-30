import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CdkTableModule } from '@angular/cdk/table';
import { DataSource } from '@angular/cdk/collections';
import { IActivity, IProgramInfo } from 'src/app/shared/models/activity.model';
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
  ELEMENT_DATA: IActivity[] = [
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
    const data= localStorage.getItem('planner') 
    if (data === null) {
      console.log('no data');
      this.router.navigate(['/dashboard/empty']);
    }
 
  }
     
   

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
 
}
