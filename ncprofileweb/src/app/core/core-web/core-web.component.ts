import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnDestroy, OnInit, PLATFORM_ID } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MainInfo } from 'src/app/core/models/main-info';
import { NavbarInfo } from '../models/navbar-info';
import { CoreContentService } from '../services/core-content.service';

@Component({
  selector: 'app-core-web',
  templateUrl: './core-web.component.html',
  styleUrls: ['./core-web.component.styl']
})
export class CoreWebComponent implements OnInit, OnDestroy {

  private subs: Subscription = new Subscription();

  isDisplayReady: boolean;

  navbarInfo: NavbarInfo;

  constructor(@Inject(PLATFORM_ID) private platform: object,
              private contentService: CoreContentService,
              private activatedRoute: ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void {
    // get main info
    this.subs.add(
      this.contentService.getMainInfo().subscribe((res: MainInfo) => {
        if (isPlatformBrowser(this.platform)) {
          // set website meta data
          document.title = res.title;

          // set navbar
          this.navbarInfo = res.navbar;
        }
        this.isDisplayReady = true;
      })
    );

    // get custom page content
    console.log(this.router.url)
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

}
