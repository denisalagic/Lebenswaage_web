import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Step2Component } from './step2.component';
import {RouterTestingModule} from '@angular/router/testing';
import {MatIconModule} from '@angular/material';
import {TranslateFakeLoader, TranslateLoader, TranslateModule, TranslateService} from '@ngx-translate/core';
import {VideoListModel} from '../../model/video-list.model';

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

  it('should call next page function', () => {
    component.totalPages = 4;
    component.currentPage = 1;

    spyOn(component, 'nextPage').and.callThrough();
    component.nextPage();

    expect(component.nextPage).toHaveBeenCalled();
    expect(component.currentPage).toBe(2);
  });

  it('should call previous page function', () => {
    component.currentPage = 2;

    spyOn(component, 'previousPage').and.callThrough();
    component.previousPage();

    expect(component.previousPage).toHaveBeenCalled();
    expect(component.currentPage).toBe(1);
  });
});
