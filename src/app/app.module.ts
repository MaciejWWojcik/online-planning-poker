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


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CreateRoomComponent,
    RoomComponent,
    RoomComponent,
    HostRoom
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
