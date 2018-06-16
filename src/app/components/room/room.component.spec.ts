import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomComponent } from './room.component';
import {CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA} from "@angular/core";
import {MaterialModule} from "../../material.module";
import {RouterTestingModule} from "@angular/router/testing";
import {APP_BASE_HREF} from "@angular/common";
import {AccountService} from "../../services/account.service";
import {HttpClientModule} from "@angular/common/http";

describe('RoomComponent', () => {
  let component: RoomComponent;
  let fixture: ComponentFixture<RoomComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoomComponent ],imports:[MaterialModule, RouterTestingModule, HttpClientModule],
      providers:[{ provide: APP_BASE_HREF, useValue: '/' }, AccountService, HttpClientModule],
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
