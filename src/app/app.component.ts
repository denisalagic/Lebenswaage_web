import { Component } from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {ActivatedRoute, Router} from '@angular/router';
import {VideoListModel} from './model/video-list.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'lebens-waage';

  private videoList: VideoListModel[] = [];
  public filteredVideoList: VideoListModel[] = [];
  public currentPage = 0;
  public totalPages = 0;

  constructor(private translate: TranslateService,
              private router: Router,
              public route: ActivatedRoute) {
    translate.addLangs(['en', 'de', 'hr']);
    translate.setDefaultLang('en');

    translate.use('en');



    const video1 = new VideoListModel(1, 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4', 'video 1', 'https://s3.eu-central-1.amazonaws.com/pipe.public.content/poster.png');
    const video2 = new VideoListModel(2, 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4', 'video 2', 'https://s3.eu-central-1.amazonaws.com/pipe.public.content/poster.png');
    const video3 = new VideoListModel(3, 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4', 'video 3', 'https://s3.eu-central-1.amazonaws.com/pipe.public.content/poster.png');
    const video4 = new VideoListModel(4, 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4', 'video 4', 'https://s3.eu-central-1.amazonaws.com/pipe.public.content/poster.png');
    const video5 = new VideoListModel(5, 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4', 'video 5', 'https://s3.eu-central-1.amazonaws.com/pipe.public.content/poster.png');

    this.videoList.push(video1);
    this.videoList.push(video2);
    this.videoList.push(video3);
    this.videoList.push(video4);
    this.videoList.push(video5);

    this.totalPages = Math.ceil(this.videoList.length / 2);
    this.filteredVideoList = this.videoList.slice(0, 2);
  }

  public setLanguage(language: string) {
    this.translate.use(language);
  }

  public previousPage(): void {
    if ((this.currentPage - 1) >= 0) {
      this.currentPage = this.currentPage - 1;
      const startElement = this.currentPage * 2;
      const endElement = startElement + 2;

      this.filteredVideoList = this.videoList.slice(startElement, endElement);
    }
  }

  public nextPage(): void {
    if ((this.currentPage + 1) < this.totalPages) {
      this.currentPage = this.currentPage + 1;
      const startElement = this.currentPage * 2;
      const endElement = startElement + 2;

      this.filteredVideoList = this.videoList.slice(startElement, endElement);
    }
  }
}
