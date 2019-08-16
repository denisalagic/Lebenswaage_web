import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Step1Component } from './step1.component';
import {RouterTestingModule} from '@angular/router/testing';
import {MatIconModule} from '@angular/material';
import {TranslateFakeLoader, TranslateLoader, TranslateModule, TranslateService} from '@ngx-translate/core';
import {VideoListModel} from '../../model/video-list.model';

describe('Step2Component', () => {
  let component: Step1Component;
  let fixture: ComponentFixture<Step1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, TranslateModule.forRoot({
        loader: {
          provide: TranslateLoader,
          useClass: TranslateFakeLoader
        }
      }), MatIconModule],
      providers: [ TranslateService ],
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

  it('should call markVideoSelected method', () => {
    // tslint:disable-next-line:max-line-length
    const videoListModel = new VideoListModel(5, 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4', 'video 5', 'https://s3.eu-central-1.amazonaws.com/pipe.public.content/poster.png');

    // tslint:disable-next-line:max-line-length
    component.previouslySelectedVideo = new VideoListModel(5, 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4', 'video 5', 'https://s3.eu-central-1.amazonaws.com/pipe.public.content/poster.png', true);

    spyOn(component, 'markVideoSelected').and.callThrough();
    component.markVideoSelected(videoListModel);

    expect(component.markVideoSelected).toHaveBeenCalled();
    expect(videoListModel.selected).toBeTruthy();
  });

  it('should call next step function', () => {
    // tslint:disable-next-line:max-line-length
    component.previouslySelectedVideo = new VideoListModel(5, 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4', 'video 5', 'https://s3.eu-central-1.amazonaws.com/pipe.public.content/poster.png', true);

    spyOn(component, 'nextStep').and.callThrough();
    component.nextStep();

    expect(component.nextStep).toHaveBeenCalled();

  });
});
