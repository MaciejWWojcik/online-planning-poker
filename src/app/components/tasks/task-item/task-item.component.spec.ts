import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskItemComponent } from './task-item.component';
import {RoomService} from "../../../services/room.service";
import {FormsModule} from "@angular/forms";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {RouterModule} from "@angular/router";
import {MaterialModule} from "../../../material.module";
import {HttpClientModule} from "@angular/common/http";
import {BrowserModule} from "@angular/platform-browser";

describe('TaskItemComponent', () => {
  let component: TaskItemComponent;
  let fixture: ComponentFixture<TaskItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaskItemComponent ],
      imports: [MaterialModule, FormsModule, HttpClientModule, RouterModule, BrowserModule,BrowserAnimationsModule],
      providers: [RoomService,HttpClientModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
