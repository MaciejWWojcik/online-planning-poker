import {NoPreloading, RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {HomeComponent} from "./components/home/home.component";
import {RoomComponent} from "./components/room/room.component";
import {RoomComponent as Host} from "./components/product-owner/room/room.component";

const appRoutes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'room', component: RoomComponent,
    children: [
      {path: 'host/:id', component: Host},
    ]
  },
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
