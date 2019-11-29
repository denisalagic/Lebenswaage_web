import { Injectable } from '@angular/core';
import 'rxjs-compat/add/observable/of';


@Injectable({
  providedIn: 'root'
})
export class StepsService {

  // tslint:disable-next-line:variable-name
  private _goal: string = null;

  // tslint:disable-next-line:variable-name
  private _trainingType: string = null;
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
  private _activity: string = null;

  // tslint:disable-next-line:variable-name
  private _foodsNotIncluded: string[] = [];

  // tslint:disable-next-line:variable-name
  private _bmi: number = null;

  // tslint:disable-next-line:variable-name
  private _gdprAgreement = false;

  // tslint:disable-next-line:variable-name
  private _targetWeight: number = 0;

  // tslint:disable-next-line:variable-name
  private _mealPlanTags: string[] = [];

  public resetProperties(): void {
    this._goal = null;
    this._trainingType = null;
    this._selectedGender = null;
    this._selectedAge = null;
    this._height = null;
    this._weight = null;
    this._waist = null;
    this._hips = null;
    this._activity = null;
    this._foodsNotIncluded = [];
    this._bmi = null;
    this._gdprAgreement = false;
    this._targetWeight = null;
    this._mealPlanTags = [];
  }

  get goal(): string {
    return this._goal;
  }

  set goal(value: string) {
    this._goal = value;
  }

  set trainingType(selectedTrainingType: string) {
    this._trainingType = selectedTrainingType;
  }

  get trainingType(): string {
    return this._trainingType;
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
  get activity(): string {
    return this._activity;
  }

  set activity(value: string) {
    this._activity = value;
  }

  get foodsNotIncluded(): string[] {
    return this._foodsNotIncluded;
  }

  set foodsNotIncluded(value: string[]) {
    this._foodsNotIncluded = value;
  }

  get bmi(): number {
    return this._bmi;
  }

  set bmi(value: number) {
    this._bmi = value;
  }

  get gdprAgreement(): boolean {
    return this._gdprAgreement;
  }

  set gdprAgreement(value: boolean) {
    this._gdprAgreement = value;
  }

  get targetWeight(): number {
    return this._targetWeight;
  }

  set targetWeight(value: number) {
    this._targetWeight = value;
  }

  get mealPlanTags(): string[] {
    return this._mealPlanTags;
  }

  set mealPlanTags(value: string[]) {
    this._mealPlanTags = value;
  }

  constructor() { }
}