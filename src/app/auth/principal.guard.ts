import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PrincipalGuard implements CanActivate {
  constructor(
    private router: Router,
  ) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const role = sessionStorage.getItem('role');
    const isAccountLocked = (sessionStorage.getItem('accountLocked') === 'true');


    if (role == "DIRECTOR" && !isAccountLocked) {
      return true
    }

    return this.router.navigate(['./login']);
  }
}
