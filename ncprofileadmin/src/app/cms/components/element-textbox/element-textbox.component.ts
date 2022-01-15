import { Component, Input, OnInit } from '@angular/core';
import { WebElementTypeEnum } from 'src/app/constants/web-element-type-enum';
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
    this.displayTextbox()
  }

  displayTextbox() {
    if (!this.webElement) {
      return;
    }

    if (this.webElement.type == WebElementTypeEnum.JSON) {
      this.renderJsonField()
    }
  }

  renderJsonField() {
    this.elementId = this.webElement.name;
    setTimeout(() => {
      const container = document.getElementById(this.elementId);
      const options = {
          mode: 'code',
          onChange: () => {
            this.webElement.data = this.editor.get();
          }
      };
      this.editor = new JSONEditor(container, options);
      this.editor.set(!!this.webElement.data ? this.webElement.data : {});
    }, 1000);
  }

  onChange(e: any) {
    this.webElement.data = e.target.value;
  }

}
