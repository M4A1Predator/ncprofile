import { HttpEvent } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
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

  constructor(private cmsService: CmsService) { }

  ngOnInit(): void {
    this.sub.add(this.cmsService.getAssets().subscribe((data: AssetFile[]) => {
      this.files = data;
    }))
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  uploadFile(files: FileList) {
    console.log(files)
  }

}
