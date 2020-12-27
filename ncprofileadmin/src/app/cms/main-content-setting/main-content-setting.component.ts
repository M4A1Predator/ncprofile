import { Component, OnInit } from '@angular/core';
import { WebElementTypeEnum } from 'src/app/constants/web-element-type-enum';
import { WebElement } from 'src/app/models/web-element';

@Component({
  selector: 'app-main-content-setting',
  templateUrl: './main-content-setting.component.html',
  styleUrls: ['./main-content-setting.component.styl']
})
export class MainContentSettingComponent implements OnInit {

  navbar: WebElement;

  constructor() {
    this.navbar = new WebElement();
    this.navbar.name = 'Navbar';
    this.navbar.type = WebElementTypeEnum.JSON;
  }

  ngOnInit(): void {
    // get data
  }

}
