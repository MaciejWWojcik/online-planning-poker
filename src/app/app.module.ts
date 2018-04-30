import {BrowserModule} from '@angular/platform-browser';
import {CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA} from '@angular/core';


import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MaterialModule} from "./material.module";
import {FormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {HomeComponent} from "./components/home/home.component";
import {CreateRoomComponent} from "./components/create-room/create-room.component";
import {RoomService} from "./services/room.service";
import {AppRoutingModule} from "./app-routing.module";
import {RoomComponent} from "./components/room/room.component";
import {RoomComponent as HostRoom} from "./components/product-owner/room/room.component";
import {TaskItemComponent} from "./components/tasks/task-item/task-item.component";
import {TaskListComponent} from "./components/tasks/task-list/task-list.component";
import {ParticipantRoomComponent} from "./components/participant/participant-room/participant-room.component";
import {EstimationComponent} from "./components/estimation/estimation.component";
import {EstimationResultComponent} from "./components/estimation-result/estimation-result.component";


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CreateRoomComponent,
    RoomComponent,
    HostRoom,
    TaskItemComponent,
    TaskListComponent,
    ParticipantRoomComponent,
    EstimationComponent,
    EstimationResultComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [RoomService],
  schemas: [
    NO_ERRORS_SCHEMA
  ],
  bootstrap: [AppComponent],
  entryComponents: [CreateRoomComponent]
})
export class AppModule {
}
