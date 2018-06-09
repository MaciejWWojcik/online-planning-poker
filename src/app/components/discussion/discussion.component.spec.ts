import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DiscussionComponent } from './discussion.component';
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

describe('DiscussionComponent', () => {
  let component: DiscussionComponent;
  let fixture: ComponentFixture<DiscussionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DiscussionComponent ],
      imports: [MatDialogModule,MaterialModule, FormsModule, HttpClientModule, RouterModule, BrowserModule,BrowserAnimationsModule],
      providers: [MatDialog, MatToolbar, RoomService, AccountService, HttpClientModule,
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
    fixture = TestBed.createComponent(DiscussionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
