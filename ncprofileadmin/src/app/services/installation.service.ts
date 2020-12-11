import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { URLs } from '../constants/url';
import { AdminAccount } from '../models/admin-account';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class InstallationService {

  constructor(private apiService: ApiService,
              private http: HttpClient) { }

  getAppSetting(): Observable<any> {
    return this.http.get(`${this.apiService.getServerUrl()}${URLs.getAppSetting}`);
  }

  firstInstall(account: AdminAccount): Observable<any> {
    return this.http.post(`${this.apiService.getServerUrl()}${URLs.install}`, account);
  }

}
