import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthenticationComponent } from './authentication.component';
import { AddUsersComponent } from './components/add-users/add-users.component';
import { LoginComponent } from './components/login/login.component';
import { OtpSelectComponent } from './components/otp-select/otp-select.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { RoutingModule } from './routing.module';



@NgModule({
  declarations: [
    AuthenticationComponent,
    AddUsersComponent,
    LoginComponent,
    OtpSelectComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RoutingModule

  ]
})
export class AuthenticationModule { }
