import { HttpClient, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { URLs } from '../constants/url';
import { AssetFile } from '../models/asset-file';
import { MainPicsReq } from '../models/main-pics';
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

  uploadMainPics(data: MainPicsReq) {
    if (!data.logo && !data.favicon) {
      return;
    }

    const formData = new FormData();
    if (data.logo) {
      formData.append('logo', data.logo);
    }

    if (data.favicon) {
      formData.append('favicon', data.favicon);
    }
    const options = this.authService.getAuthHeaderValue();
    return this.http.post(`${this.apiService.getServerUrl()}${URLs.mainPics}`, formData, options);
  }

  saveMainPics(data: MainPicsReq): Observable<any> {
    if (!data.faviconPath && !data.logoPath) {
      return;
    }

    const options = this.authService.getAuthHeaderValue();
    const body = {
      faviconPath: data.faviconPath,
      logoPath: data.logoPath
    };

    return this.http.post(`${this.apiService.getServerUrl()}${URLs.mainPics}`, body, options);
  }

  getAssets(): Observable<any> {
    const options = this.authService.getAuthHeaderValue();
    return this.http.get<AssetFile[]>(`${this.apiService.getServerUrl()}${URLs.assets}`, options);
  }

  uploadAssets(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);
    const options = this.authService.getAuthHeaderValue();
    return this.http.post(`${this.apiService.getServerUrl()}${URLs.assets}`, formData, options);
  }

  getFile(path: string): Observable<Blob> {
    const options = { ...this.authService.getAuthHeaderValue(), responseType: 'blob' }
    return this.http.get(`${this.apiService.getServerUrl()}${URLs.assets}?path=${path}`, options) as any
  }

  getWebElms(): Observable<any> {
    const options = this.authService.getAuthHeaderValue();
    return this.http.get(`${this.apiService.getServerUrl()}${URLs.elm}`, options)
  }
}
