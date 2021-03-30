import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { WebElementTypeEnum } from 'src/app/constants/web-element-type-enum';
import { MainWebInfo } from 'src/app/models/main-web-info';
import { WebElement } from 'src/app/models/web-element';
import { CmsService } from 'src/app/services/cms.service';

@Component({
  selector: 'app-main-content-setting',
  templateUrl: './main-content-setting.component.html',
  styleUrls: ['./main-content-setting.component.styl']
})
export class MainContentSettingComponent implements OnInit {

  mainInfoForm: FormGroup;
  websiteName: string;
  tabTitle: string;
  navbar: WebElement;

  constructor(private cmsService: CmsService) {
    this.mainInfoForm = new FormGroup({
      websiteName: new FormControl(this.websiteName, [
        Validators.required]),
      tabTitle: new FormControl(this.tabTitle, [
        Validators.required]),
    });

    // Navbar element
    this.navbar = new WebElement();
    this.navbar.name = 'Navbar';
    this.navbar.type = WebElementTypeEnum.JSON;
  }

  ngOnInit(): void {
    // get data
    this.cmsService.getMainContentData().subscribe((data: MainWebInfo) => {
      this.mainInfoForm.get('websiteName').setValue(data.websiteName);
      this.mainInfoForm.get('tabTitle').setValue(data.title);
    });
  }

  onSubmit() {
    const websiteName = this.mainInfoForm.get('websiteName').value;
    const tabTitle = this.mainInfoForm.get('tabTitle').value;
    const data = {
      websiteName,
      tabTitle,
      navbar: this.navbar.content
    };
  }

}
