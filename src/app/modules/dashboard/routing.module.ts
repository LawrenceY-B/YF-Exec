import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { PlannerComponent } from './pages/planner/planner.component';
import { EmptyComponent } from './components/empty/empty.component';
import { NewplanComponent } from './components/newplan/newplan.component';


const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      { path: '', component: PlannerComponent },
      {path:'empty', component: EmptyComponent},
      {path:'newplan', component:NewplanComponent}
    
    ],
  },
  { path: 'login', pathMatch: 'full', redirectTo: '/' },
  { path: '**', pathMatch: 'prefix', redirectTo: 'welcome' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RoutingModule {}
