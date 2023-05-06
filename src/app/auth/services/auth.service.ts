import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { environment } from 'src/environments/environment';

import { Auth } from '../interfaces/auth.interface';


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

  logout(): void {
    localStorage.removeItem("token");
  }

  getAuthByID(): Observable<Auth> {
    return this._http.get<Auth>(`${ this._baseUrl }/users/${ localStorage.getItem("token") }`);
  }
}
