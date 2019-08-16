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

  // tslint:disable-next-line:variable-name
  private _height: number = null;

  // tslint:disable-next-line:variable-name
  private _weight: number = null;

  // tslint:disable-next-line:variable-name
  private _waist: number = null;

  // tslint:disable-next-line:variable-name
  private _hips: number = null;

  // tslint:disable-next-line:variable-name
  private _target: number = null;

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

  get height(): number {
    return this._height;
  }

  set height(value: number) {
    this._height = value;
  }
  get weight(): number {
    return this._weight;
  }

  set weight(value: number) {
    this._weight = value;
  }
  get waist(): number {
    return this._waist;
  }

  set waist(value: number) {
    this._waist = value;
  }
  get hips(): number {
    return this._hips;
  }

  set hips(value: number) {
    this._hips = value;
  }
  get target(): number {
    return this._target;
  }

  set target(value: number) {
    this._target = value;
  }


  constructor() { }
}
