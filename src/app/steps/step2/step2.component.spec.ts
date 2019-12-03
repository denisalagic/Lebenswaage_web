import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Step2Component } from './step2.component';
import {RouterTestingModule} from '@angular/router/testing';
import {MatIconModule} from '@angular/material';
import {TranslateFakeLoader, TranslateLoader, TranslateModule, TranslateService} from '@ngx-translate/core';

describe('Step2Component', () => {
  let component: Step2Component;
  let fixture: ComponentFixture<Step2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, TranslateModule.forRoot({
        loader: {
          provide: TranslateLoader,
          useClass: TranslateFakeLoader
        }
      }), MatIconModule],
      providers: [ TranslateService ],
      declarations: [ Step2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Step2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
