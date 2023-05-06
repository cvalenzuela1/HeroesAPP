import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Auth } from 'src/app/auth/interfaces/auth.interface';
import { AuthService } from 'src/app/auth/services/auth.service';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  superhero_logo: string = environment.superhero_logo;
  isHome: boolean = false;
  localAuth: Auth = {
    id: "",
    email: "",
    usuario: "",
    username: "",
    password: ""
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
    if ( this._router.url === "/" ) {
      this.isHome = true;
    }

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

  logout(): void {
    this._authService.logout();
    this._router.navigate(["./auth"]);
  }

  toListado(): void {
    this._router.navigate(["./heroes/listado"]);
  }

  toAgregar(): void {
    this._router.navigate(["./heroes/agregar"]);
  }

  toBuscar(): void {
    this._router.navigate(["./heroes/buscar"]);
  }

}
