export class VideoListModel {

  constructor(public id: number,
              public videoUrl: string,
              public videoTitle: string,
              public posterUrl: string,
              public selected: boolean = false) {}
}
