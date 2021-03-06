import {NoPreloading, RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {HomeComponent} from './components/home/home.component';
import {RoomComponent} from './components/room/room.component';
import {CreateTaskComponent} from './components/create-task/create-task.component';
import {RoomComponent as Host} from './components/product-owner/room/room.component';
import {ParticipantRoomComponent} from './components/participant/participant-room/participant-room.component';
import {SummaryComponent} from "./components/summary/summary.component";
import {ProfileComponent} from "./components/profile/profile.component";

const appRoutes: Routes = [
  {path: '', component: HomeComponent,pathMatch: 'full'},
  {
    path: 'room', component: RoomComponent,
    children: [
      {path: 'host/:id', component: Host},
      {path: 'participant/:id', component: ParticipantRoomComponent},
      {path: 'summary/:id', component: SummaryComponent},
    ]
  },
  {path: 'create-task', component: CreateTaskComponent},
  {path: 'profile', component: ProfileComponent},

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
