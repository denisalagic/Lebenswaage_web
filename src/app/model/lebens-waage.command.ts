import {VideoListModel} from './video-list.model';

export class LebensWaageCommand {
  constructor(private goal: number,
              private selectedVideo: VideoListModel,
              private selectedGender: string,
              private selectedAge: number,
              private height: number,
              private weight: number,
              private waist: number,
              private hips: number,
              private target: number,
              private foodsNotIncluded: number,
              private gdprAgreement: boolean) {}
}
