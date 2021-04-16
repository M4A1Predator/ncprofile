import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { URLs } from '../constants/url';
import { MainWebInfoReq } from '../models/main-web-info';
import { ApiService } from './api.service';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class CmsService {

  constructor(private http: HttpClient,
              private apiService: ApiService,
              private authService: AuthService) { }

  getMainContentData(): Observable<any> {
    const options = this.authService.getAuthHeaderValue();
    return this.http.get(`${this.apiService.getServerUrl()}${URLs.getMainContentInfo}`, options);
  }

  updateMainContentData(data: MainWebInfoReq) {
    const options = this.authService.getAuthHeaderValue();
    return this.http.post(`${this.apiService.getServerUrl()}${URLs.getMainContentInfo}`, data, options);
  }
}
