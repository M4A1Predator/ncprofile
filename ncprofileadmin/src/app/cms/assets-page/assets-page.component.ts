import { HttpEvent } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
import { AssetFile } from 'src/app/models/asset-file';
import { CmsService } from 'src/app/services/cms.service';

@Component({
  selector: 'app-assets-page',
  templateUrl: './assets-page.component.html',
  styleUrls: ['./assets-page.component.styl']
})
export class AssetsPageComponent implements OnInit, OnDestroy {

  private sub: Subscription = new Subscription();
  files: AssetFile[];
  newFiles: FileList;
  uploadMsg: string;

  constructor(private cmsService: CmsService) { }

  ngOnInit(): void {
    this.loadAssets()
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  loadAssets() {
    this.sub.add(this.cmsService.getAssets().pipe(take(1)).subscribe((data: AssetFile[]) => {
      this.files = data;
    }))
  }

  uploadFile() {
    if (!this.newFiles) {
      return;
    }
    this.cmsService.uploadAssets(this.newFiles[0]).subscribe(res => {
      this.newFiles = undefined;
      this.uploadMsg = "Uploaded"
      this.loadAssets();
    }, err => {
      this.uploadMsg = "Upload failed"
    });
  }

}
