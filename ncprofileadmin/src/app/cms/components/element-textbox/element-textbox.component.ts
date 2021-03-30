import { Component, Input, OnInit } from '@angular/core';
import { WebElement } from 'src/app/models/web-element';

declare var JSONEditor: any;
@Component({
  selector: 'app-element-textbox',
  templateUrl: './element-textbox.component.html',
  styleUrls: ['./element-textbox.component.styl']
})
export class ElementTextboxComponent implements OnInit {

  @Input()
  webElement: WebElement;
  elementId: string;

  constructor() { }

  ngOnInit(): void {
    this.elementId = this.webElement.name;
    setTimeout(() => {
      const container = document.getElementById(this.elementId);
      const options = {
          mode: 'code'
      };
      const editor = new JSONEditor(container, options);
    }, 1000);
  }

  onChange(e: any) {
    this.webElement.content = e.target.value;
  }

}
