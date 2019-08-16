import { Injectable } from '@angular/core';
import {VideoListModel} from '../model/video-list.model';
import {Observable} from "rxjs";
import {LebensWaageCommand} from "../model/lebens-waage.command";
import "rxjs-compat/add/observable/of";

@Injectable({
  providedIn: 'root'
})
export class StepsService {

  public sendEmail(): Observable<LebensWaageCommand> {
    let command: LebensWaageCommand = new LebensWaageCommand(this._selectedVideo, this.selectedGender, this.selectedAge, this.height, this.weight, this.waist, this.hips, this.target, this.foodsNotIncluded, this.gdprAgreement);

    console.log("THIS IS RECEIVED COMMAND");
    console.log(command);
    return Observable.of(command);
  }

  public resetProperties(): void {
    this._selectedVideo = null;
    this._selectedGender = null;
    this._selectedAge = null;
    this._height = null;
    this._weight = null;
    this._waist = null;
    this._hips = null;
    this._target = null;
    this._foodsNotIncluded = null;
    this._gdprAgreement = false;
  }

  // tslint:disable-next-line:variable-name
  private _selectedVideo: VideoListModel = null;
  // tslint:disable-next-line:variable-name
  private _selectedGender: string = null;

  // tslint:disable-next-line:variable-name
  private _selectedAge: number = null;

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

  private _foodsNotIncluded: number = null;

  private _gdprAgreement: boolean = false;

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

  get selectedAge(): number {
    return this._selectedAge;
  }

  set selectedAge(value: number) {
    this._selectedAge = value;
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

  get foodsNotIncluded(): number {
    return this._foodsNotIncluded;
  }

  set foodsNotIncluded(value: number) {
    this._foodsNotIncluded = value;
  }

  get gdprAgreement(): boolean {
    return this._gdprAgreement;
  }

  set gdprAgreement(value: boolean) {
    this._gdprAgreement = value;
  }

  constructor() { }
}
