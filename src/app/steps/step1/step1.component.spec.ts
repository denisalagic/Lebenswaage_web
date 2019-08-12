import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Step1Component } from './step1.component';
import {RouterTestingModule} from '@angular/router/testing';

describe('Step1Component', () => {
  let component: Step1Component;
  let fixture: ComponentFixture<Step1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [ Step1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Step1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
