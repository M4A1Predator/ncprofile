import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { URLs } from '../constants/url';
import { ApiService } from './api.service';
import { AuthService } from './auth.service';
import { LanguageData, WebMessage } from '../models/web-message';

@Injectable({
  providedIn: 'root'
})
export class MessageTranslatorService {

  constructor(private http: HttpClient,
    private apiService: ApiService,
    private authService: AuthService) { }

  public getMessages(search: any): Observable<any> {
    const options = this.authService.getAuthHeaderValue()
    return this.http.get(`${this.apiService.getServerUrl()}${URLs.languages}`, options)
  }

  public parseWebMessages(languages: LanguageData[]):  WebMessage[] {
    const webMessages: WebMessage[] = []
    languages.forEach(l => {
      l.messages.forEach(msg => {
        const webMsg = new WebMessage()
        webMsg.key = msg['key']
        webMsg.language = l.lang
        webMsg.value = msg['value']
        webMessages.push(webMsg)
      })
    })
    return webMessages
  }

  public addWebMessage(webMessage: WebMessage): Observable<any> {
    const options = this.authService.getAuthHeaderValue()
    const data = {
      key: webMessage.key,
      value: webMessage.value
    }

    return this.http.post(`${this.apiService.getServerUrl()}${URLs.languages}/${webMessage.language}/messages`, data, options)
  }

  public updateWebMessage(webMessage: WebMessage): Observable<any> {
    const options = this.authService.getAuthHeaderValue()
    const data = {
      key: webMessage.key,
      value: webMessage.value
    }

    return this.http.post(`${this.apiService.getServerUrl()}${URLs.languages}/${webMessage.language}/messages`, data, options)
  }
}
