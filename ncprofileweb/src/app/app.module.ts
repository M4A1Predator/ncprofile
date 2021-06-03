import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainContentComponent } from './content/main-content/main-content.component';
import { HttpClientModule } from '@angular/common/http';
import { NavbarComponent } from './content/layout/navbar/navbar.component';
import { PageContentComponent } from './content/page-content/page-content.component';
import { CoreWebComponent } from './core/core-web/core-web.component';

@NgModule({
  declarations: [
    AppComponent,
    MainContentComponent,
    NavbarComponent,
    PageContentComponent,
    CoreWebComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
