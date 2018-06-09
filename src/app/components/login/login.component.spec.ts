import { async, ComponentFixture, TestBed } from '@angular/core/testing';

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
import {LoginComponent} from "./login.component";
import {AccountService} from "../../services/account.service";

describe('CreateUserComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      imports: [MatDialogModule,MaterialModule, FormsModule, HttpClientModule, RouterModule, BrowserModule,BrowserAnimationsModule],
      providers: [MatDialog, MatToolbar, RoomService, HttpClientModule, AccountService,
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
        entryComponents: [LoginComponent]
      }
    });

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
