import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppServerConfig } from '../models/app-server-config';
import { InstallationService } from '../services/installation.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.styl']
})
export class HomeComponent implements OnInit {

  constructor(private installationService: InstallationService,
              private route: Router) { }

  isInstalled: boolean = undefined;

  ngOnInit(): void {
    this.installationService.getAppSetting().subscribe((data: AppServerConfig) => {
      if (data && !data.isInstalled) {
        this.route.navigate(['install']);
      }
    });
  }

}
