
import { Component, Inject, OnDestroy, OnInit, PLATFORM_ID } from '@angular/core';

declare const document: any;

@Component({
  selector: 'app-main-content',
  templateUrl: './main-content.component.html',
  styleUrls: ['./main-content.component.styl']
})
export class MainContentComponent implements OnInit, OnDestroy {

  constructor() { }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
  }

}
