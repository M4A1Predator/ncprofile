import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { MainContentSettingComponent } from './cms/main-content-setting/main-content-setting.component';
import { HomeComponent } from './home/home.component';
import { InstallationComponent } from './installation/installation.component';


const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'install', component: InstallationComponent },
  { path: 'login', component: LoginComponent },
  { path: 'main-content', component: MainContentSettingComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
