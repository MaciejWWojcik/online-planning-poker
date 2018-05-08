import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {CreateRoomComponent} from './create-room.component';
import {CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA} from "@angular/core";
import {MaterialModule} from "../../material.module";
import {MatDialog, MatDialogRef, MatToolbar} from "@angular/material";
import {FormsModule} from "@angular/forms";
import {RoomService} from "../../services/room.service";
import {HttpClientModule} from "@angular/common/http";
import {Router, RouterModule} from "@angular/router";
import {BrowserModule} from "@angular/platform-browser";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

describe('CreateRoomComponent', () => {
  let component: CreateRoomComponent;
  let fixture: ComponentFixture<CreateRoomComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CreateRoomComponent],
      imports: [MaterialModule, FormsModule, HttpClientModule, RouterModule, BrowserModule,BrowserAnimationsModule],
      providers: [MatDialog, MatToolbar, RoomService, HttpClientModule,
        {provide: MatDialogRef, useValue: {}},
        {
          provide: Router, useClass: class {
            navigate = jasmine.createSpy("navigate");
          }
        }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  }));


  beforeEach(() => {
    fixture = TestBed.createComponent(CreateRoomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
