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

  editor: any;

  constructor() { }

  ngOnInit(): void {
    this.elementId = this.webElement.name;
    setTimeout(() => {
      const container = document.getElementById(this.elementId);
      const options = {
          mode: 'code',
          onChange: () => {
            this.webElement.content = this.editor.get();
          }
      };
      this.editor = new JSONEditor(container, options);
      this.editor.set(this.webElement.content);
    }, 1000);
  }

  onChange(e: any) {
    this.webElement.content = e.target.value;
  }

}
