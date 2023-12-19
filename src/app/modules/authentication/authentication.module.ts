import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthenticationComponent } from './authentication.component';
import { AddUsersComponent } from './components/add-users/add-users.component';
import { LoginComponent } from './components/login/login.component';
import { OtpSelectComponent } from './components/otp-select/otp-select.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { RoutingModule } from './routing.module';
import { MaterialModule } from 'src/app/material.module';
import { OtpComponent } from './components/otp/otp.component';
import { NgxOtpInputModule } from 'ngx-otp-input';



@NgModule({
  declarations: [
    AuthenticationComponent,
    AddUsersComponent,
    LoginComponent,
    OtpSelectComponent,
    OtpComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RoutingModule,
    MaterialModule,
    NgxOtpInputModule


  ]
})
export class AuthenticationModule { }
