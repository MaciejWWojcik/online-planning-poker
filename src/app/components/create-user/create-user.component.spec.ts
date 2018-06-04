import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateUserComponent } from './create-user.component';
import {BrowserModule} from "@angular/platform-browser";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {Router, RouterModule} from "@angular/router";
import {RoomService} from "../../services/room.service";
import {FormsModule} from "@angular/forms";
import {MaterialModule} from "../../material.module";
import {HttpClientModule} from "@angular/common/http";
import {MatDialog, MatDialogModule, MatDialogRef, MatToolbar} from "@angular/material";
import {CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA} from "@angular/core";
import {BrowserDynamicTestingModule} from "@angular/platform-browser-dynamic/testing";

describe('CreateUserComponent', () => {
  let component: CreateUserComponent;
  let fixture: ComponentFixture<CreateUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateUserComponent ],
      imports: [MatDialogModule,MaterialModule, FormsModule, HttpClientModule, RouterModule, BrowserModule,BrowserAnimationsModule],
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

    TestBed.overrideModule(BrowserDynamicTestingModule, {
      set: {
        entryComponents: [CreateUserComponent]
      }
    });

    fixture = TestBed.createComponent(CreateUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
