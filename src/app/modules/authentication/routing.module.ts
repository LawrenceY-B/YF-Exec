import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { OtpSelectComponent } from './components/otp-select/otp-select.component';
import { AuthenticationComponent } from './authentication.component';
import { AuthGuardService } from 'src/app/shared/services/auth-guard.service';



const routes: Routes = [


  {
    path: '', component: AuthenticationComponent,
    children:[
      {path : "login", component : LoginComponent},
      {path : "OTP/mode", component : OtpSelectComponent},
    ]
  },
  {path : "login",pathMatch: "full", redirectTo: "/"},
  { path: "**", pathMatch: "prefix", redirectTo: "welcome" },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RoutingModule { }
