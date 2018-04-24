import {NoPreloading, RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {HomeComponent} from "./components/home/home.component";

const appRoutes: Routes = [
  {path: '', component: HomeComponent}
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes, {useHash: true, preloadingStrategy: NoPreloading}),
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {


}
