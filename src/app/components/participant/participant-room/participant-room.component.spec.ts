import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParticipantRoomComponent } from './participant-room.component';
import {RoomService} from "../../../services/room.service";
import {FormsModule} from "@angular/forms";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {ActivatedRoute, RouterModule} from "@angular/router";
import {MaterialModule} from "../../../material.module";
import {HttpClientModule} from "@angular/common/http";
import {BrowserModule} from "@angular/platform-browser";
import {TaskItemComponent} from "../../tasks/task-item/task-item.component";
import {EstimationComponent} from "../../estimation/estimation.component";
import {CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA} from "@angular/core";

describe('ParticipantRoomComponent', () => {
  let component: ParticipantRoomComponent;
  let fixture: ComponentFixture<ParticipantRoomComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParticipantRoomComponent, TaskItemComponent, EstimationComponent],
      imports: [MaterialModule, FormsModule, HttpClientModule, RouterModule, BrowserModule,BrowserAnimationsModule],
      providers: [RoomService,HttpClientModule,
        {
          provide: ActivatedRoute, useValue: {snapshot:{params:{id:'test'}}}
        }],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParticipantRoomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
