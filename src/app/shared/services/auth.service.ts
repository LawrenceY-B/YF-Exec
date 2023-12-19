import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { StateStorageService } from './state-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private store : StateStorageService,
    public jwtHelper: JwtHelperService

  ) { }

  public isAuthenticated(): boolean {
    const token = localStorage.getItem('currentUser');
    if (!token) return false;
    return !this.jwtHelper.isTokenExpired(token);
  }
  saveUserInfo(staffInfo: any) {
    localStorage.setItem('currentUserInfo', JSON.stringify(staffInfo));
  }
  logout() {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('currentUserInfo');
    localStorage.removeItem('currentUserRole');
  }
  saveUserToken(token: string) {
    localStorage.setItem('currentUser', token);
  }
  saveUserRole(role: string) {
    localStorage.setItem('currentUserRole', role);
  }
  saveLoginInfo(res: any){

    this.logout();
    

     //store the token
     this.saveUserToken(res.token);
     // save current user info
     this.saveUserInfo(res.staffInfo);
     this.saveUserRole(res.role);
     this.store.clearUrl();
  }
}


