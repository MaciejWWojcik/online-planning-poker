import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileComponent } from './profile.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MaterialModule} from "../../material.module";
import {HttpClientModule} from "@angular/common/http";
import {Router, RouterModule} from "@angular/router";
import {CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA} from "@angular/core";
import {MatDialog, MatDialogModule, MatDialogRef, MatToolbar} from "@angular/material";
import {BrowserModule} from "@angular/platform-browser";
import {AccountService} from "../../services/account.service";
import {RoomService} from "../../services/room.service";
import {FormsModule} from "@angular/forms";

describe('ProfileComponent', () => {
  let component: ProfileComponent;
  let fixture: ComponentFixture<ProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileComponent ],
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
    fixture = TestBed.createComponent(ProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
