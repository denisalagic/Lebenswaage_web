import { Injectable } from '@angular/core';
import {VideoListModel} from '../model/video-list.model';

@Injectable({
  providedIn: 'root'
})
export class StepsService {

  // tslint:disable-next-line:variable-name
  private _selectedVideo: VideoListModel = null;
  // tslint:disable-next-line:variable-name
  private _selectedGender: string = null;

  // tslint:disable-next-line:variable-name
  private _selectedWeight: number = null;

  set selectedVideo(selectedVideo: VideoListModel) {
    this._selectedVideo = selectedVideo;
  }

  get selectedVideo(): VideoListModel {
    return this._selectedVideo;
  }

  set selectedGender(gender: string) {
    this._selectedGender = gender;
  }

  get selectedGender(): string {
    return this._selectedGender;
  }

  get selectedWeight(): number {
    return this._selectedWeight;
  }

  set selectedWeight(value: number) {
    this._selectedWeight = value;
  }

  constructor() { }
}
