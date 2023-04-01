import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Auth } from 'src/app/auth/interfaces/auth.interface';
import { AuthService } from 'src/app/auth/services/auth.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

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

  logout(): void {
    this._authService.logout();
    this._router.navigate(["./auth"]);
  }
}
