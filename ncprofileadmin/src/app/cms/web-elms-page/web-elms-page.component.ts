import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { WebElement } from 'src/app/models/web-element';
import { CmsService } from 'src/app/services/cms.service';

@Component({
  selector: 'app-web-elms-page',
  templateUrl: './web-elms-page.component.html',
  styleUrls: ['./web-elms-page.component.styl']
})
export class WebElmsPageComponent implements OnInit, OnDestroy {

  private subs: Subscription = new Subscription();
  webElms: WebElement[] = [];

  constructor(private cmsService: CmsService,
              private router: Router) { }

  ngOnInit(): void {
    this.subs.add(
      this.cmsService.getWebElms().subscribe((data: WebElement[]) => {
        this.webElms = data
      })
    );
  }

  ngOnDestroy() {

  }

  selectWebElm(name: string){
    this.router.navigate(["/contents", name])
  }

}
