import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URLs } from '../constants/URLs'
import { environment } from '../../environments/environment'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContentService {

  constructor(private httpClient: HttpClient) { }

  getMainInfo(): Observable<any> {
    return this.httpClient.get(`${environment.SERVER_URL}${URLs.mainInfo}`)
  }
}
