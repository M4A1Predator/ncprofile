import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminAccount } from '../models/admin-account';
import { AppServerConfig } from '../models/app-server-config';
import { InstallationService } from '../services/installation.service';

@Component({
  selector: 'app-installation',
  templateUrl: './installation.component.html',
  styleUrls: ['./installation.component.styl']
})
export class InstallationComponent implements OnInit {

  adminAccount: AdminAccount;
  accountForm: FormGroup;

  constructor(private installationService: InstallationService,
              private route: Router) {}

  ngOnInit(): void {

    // check installed
    this.installationService.getAppSetting().subscribe((data: AppServerConfig) => {
      if (data && data.isInstalled) {
        this.route.navigate(['main-content']);
      }
    });

    // set form
    this.adminAccount = new AdminAccount();
    this.accountForm = new FormGroup({
      username: new FormControl(this.adminAccount.username, [
        Validators.required,
        Validators.minLength(4)]),
      password: new FormControl(this.adminAccount.password, [
        Validators.required,
        Validators.minLength(4)]),
      // forbiddenNameValidator(/bob/i)
    });
  }

  onSubmit() {
    if (this.accountForm.status !== 'VALID') {
      return;
    }

    this.adminAccount.username = this.accountForm.value.username;
    this.adminAccount.password = this.accountForm.value.password;

    this.installationService.firstInstall(this.adminAccount).subscribe(res => {
      this.route.navigate(['/login']);
    });
  }

}
