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
import { EditElmPageComponent } from './cms/edit-elm-page/edit-elm-page.component';
import { WebElmEditPageComponent } from './cms/web-elm-edit-page/web-elm-edit-page.component';
import { LanguageMessagesPageComponent } from './cms/language-messages-page/language-messages-page.component';
import { AddWebMessageModalComponent } from './cms/language-messages-page/add-web-message-modal/add-web-message-modal.component';
import { EditWebMessageModalComponent } from './cms/language-messages-page/edit-web-message-modal/edit-web-message-modal.component';

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
    WebElmAddPageComponent,
    EditElmPageComponent,
    WebElmEditPageComponent,
    LanguageMessagesPageComponent,
    AddWebMessageModalComponent,
    EditWebMessageModalComponent
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
