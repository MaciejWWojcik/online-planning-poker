import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ImportTasksComponent} from './import-tasks.component';
import {HttpClientModule} from '@angular/common/http';
import {RouterModule} from '@angular/router';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MaterialModule} from '../../material.module';
import {FormsModule} from '@angular/forms';
import {RoomService} from '../../services/room.service';


describe('ImportTasksComponent', () => {
  let component: ImportTasksComponent;
  let fixture: ComponentFixture<ImportTasksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ImportTasksComponent],
      imports: [MaterialModule, FormsModule, HttpClientModule, RouterModule, BrowserModule, BrowserAnimationsModule],
      providers: [RoomService, HttpClientModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportTasksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
