import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor() { }

  public getServerUrl(): string {
    return environment.production ? location.origin : environment.SERVER_URL;
  }
}
