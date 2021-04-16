import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { MainInfo } from 'src/app/models/main-info';
import { NavbarInfo } from 'src/app/models/navbar-info';
import { ContentService } from 'src/app/services/content.service';

declare const document: any;

@Component({
  selector: 'app-main-content',
  templateUrl: './main-content.component.html',
  styleUrls: ['./main-content.component.styl']
})
export class MainContentComponent implements OnInit {

  private subs: Subscription = new Subscription();

  isDisplayReady: boolean;

  navbarInfo: NavbarInfo;

  constructor(@Inject(PLATFORM_ID) private platform: object,
              private contentService: ContentService,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.subs.add(
      this.contentService.getMainInfo().subscribe((res: MainInfo) => {
        if (isPlatformBrowser(this.platform)) {
          // set website meta data
          document.title = res.title;

          // set navbar
          this.navbarInfo = res.navbar;
        }
        this.isDisplayReady = true;

        // get custom page content
        console.log(this.activatedRoute.url)
      })
    );
  }

}
