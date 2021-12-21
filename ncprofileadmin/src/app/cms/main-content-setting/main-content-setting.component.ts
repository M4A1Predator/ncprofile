import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { $ } from 'protractor';
import { concat, merge, of, Subscription } from 'rxjs';
import { concatAll, concatMap, map, mergeAll, mergeMap, take } from 'rxjs/operators';
import { WebElementTypeEnum } from 'src/app/constants/web-element-type-enum';
import { AssetFile } from 'src/app/models/asset-file';
import { MainPicsReq } from 'src/app/models/main-pics';
import { MainWebInfo, MainWebInfoReq } from 'src/app/models/main-web-info';
import { WebElement } from 'src/app/models/web-element';
import { CmsService } from 'src/app/services/cms.service';
import { createImageFromBlob } from 'src/app/helpers/ImageHelper'

@Component({
  selector: 'app-main-content-setting',
  templateUrl: './main-content-setting.component.html',
  styleUrls: ['./main-content-setting.component.styl']
})
export class MainContentSettingComponent implements OnInit, OnDestroy {

  private subs: Subscription = new Subscription();
  saveMsg: string;
  saveLogoMsg: string;

  mainInfoForm: FormGroup;
  websiteName: string;
  tabTitle: string;
  navbar: WebElement;
  mainPicsReq: MainPicsReq = new MainPicsReq();

  currentLogoPath: string;
  currentFaviconPath: string;

  selectAssetModalName: string;

  logoImage : any;
  faviconImage: any;

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
    // this.subs.add(this.cmsService.getMainContentData().subscribe((data: MainWebInfo) => {
    //   this.mainInfoForm.get('websiteName').setValue(data.websiteName);
    //   this.mainInfoForm.get('tabTitle').setValue(data.title);
    //   this.currentLogoPath = data.logo
    //   this.currentFaviconPath = data.favicon
    //   if (data.navbar && data.navbar.data) {
    //     this.navbar.content = data.navbar.data;
    //   }
    // })
    // );

    this.subs.add(
      this.cmsService.getMainContentData().pipe(concatMap(data => {
          this.mainInfoForm.get('websiteName').setValue(data.websiteName);
          this.mainInfoForm.get('tabTitle').setValue(data.title);
          this.currentLogoPath = data.logo
          this.currentFaviconPath = data.favicon
          if (data.navbar && data.navbar.data) {
            this.navbar.content = data.navbar.data;
          }
          return of(data);
        }),
        // Get logo image
        concatMap((data: any) => {
          if (this.currentLogoPath) {
            this.cmsService.getFile(this.currentLogoPath).subscribe((res: Blob) => {createImageFromBlob(res).then(result => this.logoImage = result)})
          }
          return of(data)
        }),
        // Get favicon
        concatMap((data: any) => {
          if (this.currentFaviconPath) {
            this.cmsService.getFile(this.currentFaviconPath).subscribe((res: Blob) => {createImageFromBlob(res).then(result => this.faviconImage = result) })
          }
          return of(data)
        })
      )
      .subscribe()
    );
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  uploadLogo(files: FileList) {
    this.mainPicsReq.logo = files[0];
  }

  uploadFavicon(files: FileList) {
    this.mainPicsReq.favicon = files[0];
  }

  uploadMainPics() {
    // upload pics
    this.subs.add(
      // this.cmsService.uploadMainPics(this.mainPicsReq).pipe(take(1)).subscribe(res => {
      this.cmsService.saveMainPics(this.mainPicsReq).pipe(take(1)).subscribe(res => {
        this.saveLogoMsg = 'Success';
      }, err => {
        this.saveLogoMsg = 'Save failed';
      })
    );
  }

  onSubmit() {
    this.saveMsg = '';

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

  openSelectAssetModal(name: string) {
    this.selectAssetModalName = name;
  }

  onCloseModal(val: any) {
    this.selectAssetModalName = undefined;
  }

  onSelectAsset(asset: AssetFile) {
    if (asset.isDir) {
      return;
    }

    if (this.selectAssetModalName === 'logo') {
      this.mainPicsReq.logoPath = asset.path;
      this.cmsService.getFile(this.mainPicsReq.logoPath).subscribe((res: Blob) => {createImageFromBlob(res).then(result => this.logoImage = result)})
    } else {
      this.mainPicsReq.faviconPath = asset.path;
      this.cmsService.getFile(this.mainPicsReq.faviconPath).subscribe((res: Blob) => {createImageFromBlob(res).then(result => this.faviconImage = result)})
    }

    // close modal
    this.selectAssetModalName = undefined;
  }

  
}
