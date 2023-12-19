import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';
import { StateStorageService } from './state-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {

  /**
   *
   * @param auth {AuthService}
   * @param router Router
   * @param stateStorageService
   */
  constructor(
    public auth: AuthService,
    public router: Router,
    private stateStorageService: StateStorageService,
    ) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (!this.auth.isAuthenticated()) {

      this.stateStorageService.storeUrl(state.url);

      this.router.navigate(['/login']);

      return false;
    }

    return true;
  }
}
