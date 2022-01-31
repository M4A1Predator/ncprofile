import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { URLs } from '../constants/url';
import { LoginCred } from '../models/login-cred';
import { ApiService } from './api.service';
import { AuthStoreValue } from '../models/auth-store-value';
import { flatMap, map, mergeMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  serverUrl: string;

  constructor(private http: HttpClient,
              private apiService: ApiService) {
  }

  requestToken(cred: LoginCred): Observable<any> {
    return this.http.post(`${this.apiService.getServerUrl()}${URLs.requestToken}`, cred);
  }

  logout(): void {
    localStorage.setItem('auth', '');
  }

  getAuthHeaderValue(httpOptions: any = null): any {
    const authValue = localStorage.getItem('auth');
    if (!authValue) {
      return;
    }
    const authSerialized: AuthStoreValue = JSON.parse(authValue);
    if (httpOptions) {
      httpOptions.headers['x-authorization'] = authSerialized.accessToken;
      return httpOptions;
    }
    return {
      headers: {
        'x-authorization': authSerialized.accessToken
      }
    };
  }

  verifyToken(): Observable<any> {
    const authValue = localStorage.getItem('auth');
    if (!authValue) {
      return of(false)
    }

    const authSerialized: AuthStoreValue = JSON.parse(authValue);
    const headers = {
      'x-authorization': authSerialized.accessToken
    }
    return this.http.get(`${this.apiService.getServerUrl()}${URLs.verifyToken}`, {responseType:"text", observe: 'response', headers})
  }
}
