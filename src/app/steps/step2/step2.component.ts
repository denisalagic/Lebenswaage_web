import { Component, OnInit } from '@angular/core';
import {VideoListModel} from '../../model/video-list.model';
import {StepsService} from '../steps.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ApiCallsService} from '../../api-calls.service';
import {CodebookModel} from '../../model/codebook.model';

@Component({
  selector: 'app-step2',
  templateUrl: './step2.component.html',
  styleUrls: ['./step2.component.css']
})
export class Step2Component implements OnInit {

  // tslint:disable-next-line:variable-name
  public trainingTypePicked: string = null;
  public filteredVideoList: CodebookModel[] = [];
  public currentPage = 0;
  public totalPages = 0;
  public trainings: CodebookModel[] = [];


  constructor(private stepsService: StepsService,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private apiCalls: ApiCallsService) { }


  ngOnInit() {
    this.apiCalls.getTrainingTypes().subscribe(trainingTypes => {
      this.trainings = trainingTypes;
      this.totalPages = Math.ceil(this.trainings.length / 4);
      this.filteredVideoList = this.trainings.slice(0, 4);
    });
  }

  public markVideoSelected(videoCode: string): void {
    this.trainingTypePicked = videoCode;
  }

  public previousPage(): void {
    if ((this.currentPage - 1) >= 0) {
      this.currentPage = this.currentPage - 1;
      const startElement = this.currentPage * 4;
      const endElement = startElement + 4;

      this.filteredVideoList = this.trainings.slice(startElement, endElement);
    }
  }

  public nextPage(): void {
    if ((this.currentPage + 1) < this.totalPages) {
      this.currentPage = this.currentPage + 1;
      const startElement = this.currentPage * 4;
      const endElement = startElement + 4;

      this.filteredVideoList = this.trainings.slice(startElement, endElement);
    }
  }

  public nextStep(): void {
    if (this.trainingTypePicked != null) {
      this.stepsService.trainingType = this.trainingTypePicked;
      this.router.navigate(['../step-3'], {relativeTo: this.activatedRoute});
    }
  }

  public getVideoUrl(video: CodebookModel): string {
    let videoUrl;
    for (let i = 0; i < video.files.length; i++) {
      if (video.files[i].indexOf('mp4') > -1) {
        videoUrl = video.files[i];
      }
    }
    return videoUrl;
  }

  public getPosterUrl(video: CodebookModel): string {
    let videoUrl;
    for (let i = 0; i < video.files.length; i++) {
      if (video.files[i].indexOf('jpg') > -1 || video.files[i].indexOf('jpeg') > -1) {
        videoUrl = video.files[i];
      }
    }
    return videoUrl;
  }
}
