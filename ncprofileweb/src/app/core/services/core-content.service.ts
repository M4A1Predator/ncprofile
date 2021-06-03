import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment'
import { URLs } from '../constants/URLs';

@Injectable({
  providedIn: 'root'
})
export class CoreContentService {

  constructor(private httpClient: HttpClient) { }

  getMainInfo(): Observable<any> {
    return this.httpClient.get(`${environment.SERVER_URL}${URLs.mainInfo}`)
  }
}
