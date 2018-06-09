import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {RoomComponent} from './room.component';
import {MaterialModule} from "../../../material.module";
import {BrowserModule} from "@angular/platform-browser";
import {
  ActivatedRoute, ActivatedRouteSnapshot, convertToParamMap, Data, ParamMap, Params, Route, RouterModule,
  UrlSegment
} from "@angular/router";
import {MatDialog, MatDialogRef, MatToolbar} from "@angular/material";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, Type} from "@angular/core";
import {RoomService} from "../../../services/room.service";
import {FormsModule} from "@angular/forms";
import {Observable} from "rxjs/Observable";
import {ReplaySubject} from "rxjs/ReplaySubject";
import {RouterTestingModule} from "@angular/router/testing";
import {HttpClientModule} from "@angular/common/http";
import {AccountService} from "../../../services/account.service";

export class ActivatedRouteStub {
  // Use a ReplaySubject to share previous values with subscribers
  // and pump new values into the `paramMap` observable
  private subject = new ReplaySubject<ParamMap>();

  constructor(initialParams?: Params) {
    this.setParamMap(initialParams);
  }

  /** The mock paramMap observable */
  readonly paramMap = this.subject.asObservable();

  /** Set the paramMap observables's next value */
  setParamMap(params?: Params) {
    this.subject.next(convertToParamMap(params));
  };
}


describe('RoomComponent', () => {
  let component: RoomComponent;
  let fixture: ComponentFixture<RoomComponent>;

  beforeEach(async(() => {

    let temp = new ActivatedRouteStub();

    TestBed.configureTestingModule({
      declarations: [ RoomComponent ],
      imports: [MaterialModule, FormsModule, RouterTestingModule, BrowserModule,BrowserAnimationsModule, HttpClientModule],
      providers: [MatDialog, MatToolbar, AccountService ,RoomService,
        {
          provide: ActivatedRoute, useValue: {snapshot:{params:{id:'test'}}}
        }, HttpClientModule
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
