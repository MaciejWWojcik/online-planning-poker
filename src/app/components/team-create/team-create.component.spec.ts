import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamCreateComponent } from './team-create.component';
import {RouterTestingModule} from "@angular/router/testing";
import {BrowserModule} from "@angular/platform-browser";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {ActivatedRoute} from "@angular/router";
import {MaterialModule} from "../../material.module";
import {HttpClientModule} from "@angular/common/http";
import {CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA} from "@angular/core";
import {RoomService} from "../../services/room.service";
import {FormsModule} from "@angular/forms";
import {MatDialog, MatToolbar} from "@angular/material";

describe('TeamCreateComponent', () => {
  let component: TeamCreateComponent;
  let fixture: ComponentFixture<TeamCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeamCreateComponent ],
      imports: [MaterialModule, FormsModule, RouterTestingModule, BrowserModule,BrowserAnimationsModule, HttpClientModule],
      providers: [MatDialog, MatToolbar, RoomService,
        {
          provide: ActivatedRoute, useValue: {snapshot:{params:{id:'test'}}}
        }, HttpClientModule
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
