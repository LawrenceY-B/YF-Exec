import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { PlannerComponent } from './pages/planner/planner.component';
import { RoutingModule } from './routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { EmptyComponent } from './components/empty/empty.component';
import { NewplanComponent } from './components/newplan/newplan.component';
import { ActivitiesComponent } from './components/activities/activities.component';



@NgModule({
  declarations: [
    DashboardComponent,
    PlannerComponent,
    EmptyComponent,
    NewplanComponent,
    ActivitiesComponent
    
  ],
  imports: [
    CommonModule,
    RoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    SharedModule,
    
  ]
})
export class DashboardModule { }
