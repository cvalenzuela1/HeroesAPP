import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad {

  constructor
  ( 
    private _authService: AuthService,
    private _router     : Router
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      return this._authService.verificaAutenticacion()
        .pipe(
          tap( isAuthenticated => (isAuthenticated) ? true : this._router.navigate(["./auth/login"]) )
        );
  }

  canLoad (
    route: Route,
    segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      return this._authService.verificaAutenticacion()
        .pipe(
          tap( isAuthenticated => (isAuthenticated) ? true : this._router.navigate(["./auth/login"]) )
        );
  }
}
