import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { OtpSelectComponent } from './components/otp-select/otp-select.component';
import { AuthenticationComponent } from './authentication.component';
import { AuthGuardService } from 'src/app/shared/services/auth-guard.service';
import { OtpComponent } from './components/otp/otp.component';
import { VerificationComponent } from './components/verification/verification.component';

const routes: Routes = [
  {
    path: '',
    component: AuthenticationComponent,
    children: [
      { path: '', component: LoginComponent },
      { path: 'OTPmode', component: OtpSelectComponent },
      { path: 'OTP', component: OtpComponent },
      { path: 'verified', component: VerificationComponent },
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
