import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './layout/navbar/navbar.component';
import { LayoutComponent } from './layout/layout.component';
import { InstallationComponent } from './installation/installation.component';
import { HomeComponent } from './home/home.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MainContentSettingComponent } from './cms/main-content-setting/main-content-setting.component';
import { ElementTextboxComponent } from './cms/components/element-textbox/element-textbox.component';
import { LoginComponent } from './auth/login/login.component';
import { AssetsPageComponent } from './cms/assets-page/assets-page.component';
import { SelectAssetModalComponent } from './cms/components/select-asset-modal/select-asset-modal.component';
import { WebElmsPageComponent } from './cms/web-elms-page/web-elms-page.component';
import { WebElmAddPageComponent } from './cms/web-elm-add-page/web-elm-add-page.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LayoutComponent,
    InstallationComponent,
    HomeComponent,
    MainContentSettingComponent,
    ElementTextboxComponent,
    LoginComponent,
    AssetsPageComponent,
    SelectAssetModalComponent,
    WebElmsPageComponent,
    WebElmAddPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
