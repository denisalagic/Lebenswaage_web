export class VideoListModel {

  constructor(public id: number,
              public type: string,
              public videoUrl: string,
              public videoTitle: string,
              public posterUrl: string,
              public selected: boolean = false) {}
}
