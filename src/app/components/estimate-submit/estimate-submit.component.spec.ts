import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EstimateSubmitComponent } from './estimate-submit.component';
import {FormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";
import {MaterialModule} from "../../material.module";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {BrowserModule} from "@angular/platform-browser";
import {RoomService} from "../../services/room.service";
import {HttpClientModule} from "@angular/common/http";

describe('EstimateSubmitComponent', () => {
  let component: EstimateSubmitComponent;
  let fixture: ComponentFixture<EstimateSubmitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EstimateSubmitComponent ],
      imports: [MaterialModule, FormsModule, HttpClientModule, RouterModule, BrowserModule,BrowserAnimationsModule],
      providers: [RoomService,HttpClientModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EstimateSubmitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
