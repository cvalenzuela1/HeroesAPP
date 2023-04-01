import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Auth } from 'src/app/auth/interfaces/auth.interface';
import { AuthService } from 'src/app/auth/services/auth.service';


@Component({
  selector: 'app-error-page',
  templateUrl: './error-page.component.html',
  styleUrls: ['./error-page.component.css']
})
export class ErrorPageComponent {

  _404img: string = "assets/images/404videogame.png";
  
  get auth(): Auth {
    return this._authService.auth;
  }

  constructor
  (
    private _router     : Router,
    private _authService: AuthService
  ) { }

  login(): void {
    this._router.navigate(["./auth"]);
  }

  register(): void {
    this._router.navigate(["./auth/registro"]);
  }


}