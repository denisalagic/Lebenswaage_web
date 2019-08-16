import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Step2Component } from './step2.component';
import {RouterTestingModule} from '@angular/router/testing';
import {TranslateFakeLoader, TranslateLoader, TranslateModule, TranslateService} from '@ngx-translate/core';
import {MatButtonModule, MatSliderChange, MatSliderModule} from '@angular/material';

describe('Step3Component', () => {
  let component: Step2Component;
  let fixture: ComponentFixture<Step2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, TranslateModule.forRoot({
        loader: {
          provide: TranslateLoader,
          useClass: TranslateFakeLoader
        }
      }), MatButtonModule, MatSliderModule],
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

  it('should call select gender method', () => {

    spyOn(component, 'selectGender').and.callThrough();
    component.selectGender('male');

    expect(component.selectGender).toHaveBeenCalled();
    expect(component.selectedGender).toBe('male');
  });

  it('should call onInputChange method', () => {
    const event: MatSliderChange = new MatSliderChange();
    event.value = 45;

    spyOn(component, 'onInputChange').and.callThrough();

    component.onInputChange(event);

    expect(component.onInputChange).toHaveBeenCalled();
    expect(component.selectedAge).toBe(45);

  });

  it('should call formatLabel method', () => {
    spyOn(component, 'formatLabel').and.callThrough();

    component.formatLabel(44);

    expect(component.formatLabel).toHaveBeenCalled();
  });

});
