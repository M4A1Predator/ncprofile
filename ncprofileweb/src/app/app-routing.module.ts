import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainContentComponent } from './content/main-content/main-content.component';
import { CoreWebComponent } from './core/core-web/core-web.component';


const routes: Routes = [
  { path: '**', component: CoreWebComponent, pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabled'
})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
