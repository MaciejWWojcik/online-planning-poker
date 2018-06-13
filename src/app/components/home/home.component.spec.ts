import {async, ComponentFixture, inject, TestBed} from '@angular/core/testing';

import { HomeComponent } from './home.component';
import {AppComponent} from "../../app.component";
import {MatDialog, MatDialogModule, MatSnackBar, MatToolbar, MatToolbarModule} from "@angular/material";
import {MaterialModule} from "../../material.module";
import {CUSTOM_ELEMENTS_SCHEMA} from "@angular/core";
import {AccountService} from "../../services/account.service";
import {Router} from "@angular/router";
import {HttpClientModule} from "@angular/common/http";

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeComponent ],
      imports: [MaterialModule, HttpClientModule],
      providers: [MatDialog, MatToolbar, MatSnackBar, HttpClientModule, AccountService, {
        provide: Router, useClass: class {
          navigate = jasmine.createSpy("navigate");
        }
      }],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render title in a h1 tag', async(() => {
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('Online Planning Poker');
  }));

  it('should render button to create the room', async(() => {
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('#create').textContent).toContain('Create room');
  }));

});
