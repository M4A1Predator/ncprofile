import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { URLs } from '../constants/url';
import { LoginCred } from '../models/login-cred';
import { ApiService } from './api.service';

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
}
