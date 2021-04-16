import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
import { WebElementTypeEnum } from 'src/app/constants/web-element-type-enum';
import { MainWebInfo, MainWebInfoReq } from 'src/app/models/main-web-info';
import { WebElement } from 'src/app/models/web-element';
import { CmsService } from 'src/app/services/cms.service';

@Component({
  selector: 'app-main-content-setting',
  templateUrl: './main-content-setting.component.html',
  styleUrls: ['./main-content-setting.component.styl']
})
export class MainContentSettingComponent implements OnInit, OnDestroy {

  private subs: Subscription = new Subscription();
  saveMsg: string;

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
    this.subs.add(this.cmsService.getMainContentData().subscribe((data: MainWebInfo) => {
      this.mainInfoForm.get('websiteName').setValue(data.websiteName);
      this.mainInfoForm.get('tabTitle').setValue(data.title);
      this.navbar.content = data.navbar.data;
    })
    );
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  onSubmit() {
    const websiteName = this.mainInfoForm.get('websiteName').value;
    const tabTitle = this.mainInfoForm.get('tabTitle').value;
    const data = {
      websiteName,
      title: websiteName,
      tabTitle,
      navbar: this.navbar.content
    } as MainWebInfoReq;

    // update
    this.subs.add(
      this.cmsService.updateMainContentData(data).pipe(take(1)).subscribe(res => {
        this.saveMsg = 'saved';
      })
    );
  }

}
