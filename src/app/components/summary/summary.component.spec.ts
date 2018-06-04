import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SummaryComponent } from './summary.component';
import {FormsModule} from "@angular/forms";
import {ActivatedRoute, RouterModule} from "@angular/router";
import {MaterialModule} from "../../material.module";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {BrowserModule} from "@angular/platform-browser";
import {RoomService} from "../../services/room.service";
import {HttpClientModule} from "@angular/common/http";
import {CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA} from "@angular/core";
import {MatDialog, MatToolbar} from "@angular/material";
import {RouterTestingModule} from "@angular/router/testing";

describe('SummaryComponent', () => {
  let component: SummaryComponent;
  let fixture: ComponentFixture<SummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SummaryComponent ],
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
    fixture = TestBed.createComponent(SummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
