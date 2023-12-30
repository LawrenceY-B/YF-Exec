import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { IActivity } from 'src/app/shared/models/activity.model';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-planner',
  templateUrl: './planner.component.html',
  styleUrls: ['./planner.component.scss'],
})
export class PlannerComponent implements OnInit, AfterViewInit {
  @Input() plannerReceiver: IActivity[] = [];
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private router: Router, private fb: NonNullableFormBuilder) {}
  displayedColumns: string[] = ['Date', 'Activity', 'Leaders', 'Synopsis'];
  dataSource!: MatTableDataSource<any>; // Declare dataSource as MatTableDataSource



  ngOnInit(): void {
    const data = localStorage.getItem('planner');
    if (data === null) {
      console.log('no data');
      this.router.navigate(['/dashboard/empty']);
    }

    const detail = localStorage.getItem('timetable');
    if(!detail){
      this.plannerReceiver = [];
    }
    
  this.plannerReceiver = JSON.parse(detail as string) as IActivity[];
  this.dataSource = new MatTableDataSource(this.plannerReceiver);

   
  }
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;

  }
  receivePlanner(event: IActivity) {
    this.plannerReceiver.push(event);
    localStorage.setItem('timetable', JSON.stringify(this.plannerReceiver));
    this.dataSource = new MatTableDataSource(this.plannerReceiver);
    this.dataSource.paginator = this.paginator;

    console.log(this.plannerReceiver);
  }
}
