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

  private _baseUrl: string = environment.baseUrl;
  private _auth   : Auth | undefined;

  get auth(): Auth {
    return { ...this._auth! };
  }

  constructor( private _http: HttpClient ) { }

  verificaAutenticacion(): Observable<boolean> {
    if ( !localStorage.getItem("token") ) { 
      return of(false) 
    };

    return this._http.get<Auth>(`${ this._baseUrl }/usuarios/1`)
      .pipe(
        map( auth  => {
          this._auth = auth;
          return true;
        })
      );
  }

  login(): Observable<Auth> {
    return this._http.get<Auth>(`${ this._baseUrl }/usuarios/1`)
      .pipe(
        tap( auth => this._auth = auth ),
        tap( auth => localStorage.setItem("token", auth.id) )
      );
  }

  logout(): void {
    localStorage.removeItem("token");
  }
}
