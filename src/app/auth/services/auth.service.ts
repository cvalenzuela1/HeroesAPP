import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

import { Auth } from '../interfaces/auth.interface';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _baseUrl: string = environment.baseUrl;

  constructor( private _http: HttpClient ) { }

  login(): Observable<Auth> {
    return this._http.get<Auth>(`${ this._baseUrl }/usuarios/1`);
  }
}
