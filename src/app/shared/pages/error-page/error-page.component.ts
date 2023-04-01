import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Auth } from 'src/app/auth/interfaces/auth.interface';
import { AuthService } from 'src/app/auth/services/auth.service';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-error-page',
  templateUrl: './error-page.component.html',
  styleUrls: ['./error-page.component.css']
})
export class ErrorPageComponent implements OnInit {

  _404img       : string = "assets/images/404videogame.png";
  superhero_logo: string = environment.superhero_logo;
  localAuth     : Auth = {
    id: "",
    email: "",
    usuario: ""
  }
  
  get auth(): Auth {
    return this._authService.auth;
  }

  constructor
  (
    private _router     : Router,
    private _authService: AuthService
  ) { }

  ngOnInit(): void {
    if( localStorage.getItem("token") ) {
      this._authService.getAuthByID()
      .subscribe( data => {
        this.localAuth = data;
      });
    }
    
  }

  login(): void {
    this._router.navigate(["./auth"]);
  }

  register(): void {
    this._router.navigate(["./auth/registro"]);
  }


}