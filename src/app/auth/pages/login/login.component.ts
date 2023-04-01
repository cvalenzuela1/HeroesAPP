import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor
  ( 
    private _router: Router,
    private _authService: AuthService
  ) { }

  login(): void {
    this._authService.login()
      .subscribe( resp => {
        console.log( resp );
        if ( resp.id ) {
          this._router.navigate(["./heroes"]);
        }
      });
  }

  noLogin(): void {
    this._router.navigate(["/heroes"]);
  }

}
