import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EstimationResultComponent } from './estimation-result.component';

describe('EstimationResultComponent', () => {
  let component: EstimationResultComponent;
  let fixture: ComponentFixture<EstimationResultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EstimationResultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EstimationResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
