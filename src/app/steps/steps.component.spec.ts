import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StepsComponent } from './steps.component';
import {RouterTestingModule} from '@angular/router/testing';
import {TranslateFakeLoader, TranslateLoader, TranslateModule, TranslateService} from '@ngx-translate/core';
import {MatButtonModule, MatSliderModule} from '@angular/material';

describe('StepsComponent', () => {
  let component: StepsComponent;
  let fixture: ComponentFixture<StepsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, TranslateModule.forRoot({
        loader: {
          provide: TranslateLoader,
          useClass: TranslateFakeLoader
        }
      }), MatButtonModule, MatSliderModule],
      providers: [ TranslateService ],
      declarations: [ StepsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StepsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
