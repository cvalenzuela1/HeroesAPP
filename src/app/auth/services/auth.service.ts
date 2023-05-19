import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';

import * as jwt from 'jsonwebtoken';

import { Auth } from '../interfaces/auth.interface';
import { environment } from 'src/environments/environment';



@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _baseUrl   : string = environment.baseUrl;
  private _auth      : Auth | undefined;

  get auth(): Auth {
    return { ...this._auth! };
  }

  constructor( private _http: HttpClient ) { }

  verificaAutenticacion(): Observable<boolean> {
    if ( !localStorage.getItem("token") ) { 
      return of(false) 
    }
    else {
      return of(true)
    }
  }

  login(username: string, password: string): Observable<Auth[]> {
    const encodedPassword = encodeURIComponent(password);
    return this._http.get<Auth[]>(`${ this._baseUrl }/users?username=${ username }&password=${ encodedPassword }`)
      .pipe(
        tap( auth => this._auth = auth[0] ),
        tap( auth => localStorage.setItem("token", auth[0]?.id) ),
        tap( console.log )
      );
  }

  jwtAuthentication(username: string, id: string): void {
    const userData = { username: username, id: id };
    const token = jwt.sign(userData, 'secret_key', { expiresIn: '1h' });

    // Adjuntar el token en el encabezado de autorización
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + token
    });

    // Realizar una solicitud posterior con el token adjunto en el encabezado
    this._http.get(`${ this._baseUrl }`, { headers: headers })
      .subscribe(data => {
        console.log("Funciona JWT", data);
      });
  }

  logout(): void {
    localStorage.removeItem("token");
  }

  getAuthByID(): Observable<Auth> {
    return this._http.get<Auth>(`${ this._baseUrl }/users/${ localStorage.getItem("token") }`);
  }
}
