import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Step3Component } from './step3.component';
import {RouterTestingModule} from '@angular/router/testing';
import {TranslateFakeLoader, TranslateLoader, TranslateModule, TranslateService} from '@ngx-translate/core';
import {MatButtonModule, MatSliderChange, MatSliderModule} from '@angular/material';

describe('Step3Component', () => {
  let component: Step3Component;
  let fixture: ComponentFixture<Step3Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, TranslateModule.forRoot({
        loader: {
          provide: TranslateLoader,
          useClass: TranslateFakeLoader
        }
      }), MatButtonModule, MatSliderModule],
      providers: [ TranslateService ],
      declarations: [ Step3Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Step3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


});
