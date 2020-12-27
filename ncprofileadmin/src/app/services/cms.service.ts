import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CmsService {

  constructor() { }

  getMainContentData(): Observable<any> {
    return new Observable();
  }

  updateMainContentData() {

  }
}
