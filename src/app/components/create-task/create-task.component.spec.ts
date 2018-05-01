import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {CreateTaskComponent} from './create-task.component';
import {MaterialModule} from '../../material.module';
import {FormsModule} from '@angular/forms';
import {RoomService} from '../../services/room.service';
import {HttpClientModule} from '@angular/common/http';

describe('CreateTaskComponent', () => {
  let component: CreateTaskComponent;
  let fixture: ComponentFixture<CreateTaskComponent>;
  let mockService: RoomService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CreateTaskComponent],
      imports: [MaterialModule, FormsModule, HttpClientModule],
      providers: [RoomService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    mockService = {getPriorities: null} as RoomService;
    spyOn(mockService, 'getPriorities').and.returnValue([1, 2]);
    fixture = TestBed.createComponent(CreateTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
