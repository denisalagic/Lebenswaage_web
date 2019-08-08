import { Component, OnInit } from '@angular/core';
import {VideoListModel} from '../../model/video-list.model';
import {StepsService} from '../steps.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-step2',
  templateUrl: './step2.component.html',
  styleUrls: ['./step2.component.css']
})
export class Step2Component implements OnInit {

  private videoList: VideoListModel[] = [];
  private previouslySelectedVideo: VideoListModel = null;
  public filteredVideoList: VideoListModel[] = [];
  public currentPage = 0;
  public totalPages = 0;


  constructor(private stepsService: StepsService,
              private router: Router,
              private activatedRoute: ActivatedRoute) { }


  ngOnInit() {
    const video1 = new VideoListModel(1, 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4', 'video 1');
    const video2 = new VideoListModel(2, 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4', 'video 2');
    const video3 = new VideoListModel(3, 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4', 'video 3');
    const video4 = new VideoListModel(4, 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4', 'video 4');
    const video5 = new VideoListModel(5, 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4', 'video 5');

    this.videoList.push(video1);
    this.videoList.push(video2);
    this.videoList.push(video3);
    this.videoList.push(video4);
    this.videoList.push(video5);

    this.totalPages = Math.ceil(this.videoList.length / 4);
    this.filteredVideoList = this.videoList.slice(0, 4);
  }

  public markVideoSelected(video: VideoListModel): void {
    if (this.previouslySelectedVideo != null) {
      this.previouslySelectedVideo.selected = false;
    }
    video.selected = true;
    this.previouslySelectedVideo = video;
  }

  public previousPage(): void {
    if ((this.currentPage - 1) >= 0) {
      this.currentPage = this.currentPage - 1;
      const startElement = this.currentPage * 4;
      const endElement = startElement + 4;

      this.filteredVideoList = this.videoList.slice(startElement, endElement);
    }
  }

  public nextPage(): void {
    if ((this.currentPage + 1) < this.totalPages) {
      this.currentPage = this.currentPage + 1;
      const startElement = this.currentPage * 4;
      const endElement = startElement + 4;

      this.filteredVideoList = this.videoList.slice(startElement, endElement);
    }
  }

  public nextStep(): void {
    if (this.previouslySelectedVideo != null) {
      this.stepsService.selectedVideo = this.previouslySelectedVideo;
      this.router.navigate(['../step-3'], {relativeTo: this.activatedRoute});
    }
  }

}
