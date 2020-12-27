import { Component, Input, OnInit } from '@angular/core';
import { WebElement } from 'src/app/models/web-element';

@Component({
  selector: 'app-element-textbox',
  templateUrl: './element-textbox.component.html',
  styleUrls: ['./element-textbox.component.styl']
})
export class ElementTextboxComponent implements OnInit {

  @Input()
  webElement: WebElement;

  constructor() { }

  ngOnInit(): void {
  }

}
