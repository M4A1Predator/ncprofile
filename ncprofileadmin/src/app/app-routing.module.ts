import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { LoginComponent } from './auth/login/login.component';
import { AssetsPageComponent } from './cms/assets-page/assets-page.component';
import { MainContentSettingComponent } from './cms/main-content-setting/main-content-setting.component';
import { WebElmAddPageComponent } from './cms/web-elm-add-page/web-elm-add-page.component';
import { WebElmEditPageComponent } from './cms/web-elm-edit-page/web-elm-edit-page.component';
import { WebElmsPageComponent } from './cms/web-elms-page/web-elms-page.component';
import { HomeComponent } from './home/home.component';
import { InstallationComponent } from './installation/installation.component';


const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full', canActivate: [AuthGuard] },
  { path: 'install', component: InstallationComponent },
  { path: 'login', component: LoginComponent },
  { path: 'main-content', component: MainContentSettingComponent, canActivate: [AuthGuard] },
  { path: 'assets', component: AssetsPageComponent, canActivate: [AuthGuard] },
  { path: 'contents', component: WebElmsPageComponent, canActivate: [AuthGuard]},
  { path: 'contents/add', component: WebElmAddPageComponent, canActivate: [AuthGuard]},
  { path: 'contents/:elmName', component: WebElmEditPageComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
