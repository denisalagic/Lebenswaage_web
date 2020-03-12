import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {MatRadioChange, MatSliderChange} from '@angular/material';
import {StepsService} from '../steps.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ApiCallsService} from '../../api-calls.service';
import {CodebookModel} from '../../model/codebook.model';
import {FormControl} from '@angular/forms';
import {ReplaySubject, Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-step4',
  templateUrl: './step4.component.html',
  styleUrls: ['./step4.component.css']
})
export class Step4Component implements OnInit {
  @Output() step4Valid = new EventEmitter<any>();


  public checkedFoodTypes: string[] = [];
  public blacklistedFoodTypes: CodebookModel[] = [];
  public minWeight: number = 0;
  public maxWeight: number = 0;
  public optimalCaloriesIntake: number = 0;
  public additionalCaloriesNeeded: number = 0;
  public selectedLanguage: string;

  public bmi:number = 0;
  public bmr: number = 0;
  public tee: number = 0;


  constructor(private stepsService: StepsService,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private apiCalls: ApiCallsService,
              private translate: TranslateService) { }

  ngOnInit() {
    this.apiCalls.getBlacklistedFoodTypes().subscribe(foodTypes => {
      this.blacklistedFoodTypes = foodTypes;
    });
    this.step4Valid.emit({
      stepPosition: 4,
      valid: true
    });

    this.selectedLanguage = this.translate.currentLang;
    this.calculateBMI();
    this.calculateBMR();
  }

  public pickFood(pickedFood: string) {
    if (this.checkedFoodTypes.includes(pickedFood)) {
      let index = this.checkedFoodTypes.findIndex(food =>  food == pickedFood);
      this.checkedFoodTypes.splice(index, 1);
    } else {
      this.checkedFoodTypes.push(pickedFood);
    }
    this.stepsService.foodsNotIncluded = this.checkedFoodTypes;

  }

  public markSelectedFood(currentFood: string): boolean {
    let hasElement = false;
    for(let i = 0; i < this.checkedFoodTypes.length; i++) {
      if (this.checkedFoodTypes[i] == currentFood) {
        hasElement = true;
      }
    }
    return hasElement;
  }

  public getBmiValue() {
    if (this.bmi < 18.5) {
      return this.bmi + ' - UNDERWEIGHT';
    } else if (this.bmi >= 18.5 && this.bmi <= 24.9) {
      return this.bmi + ' - NORMAL';
    } else if (this.bmi >= 25 && this.bmi <= 29.9) {
      return this.bmi + ' - OVERWEIGHT';
    } else if (this.bmi >= 30 && this.bmi <= 39.9) {
      return this.bmi + ' - OBESITY';
    } else {
      return this.bmi + ' - EXTREME OBESE';
    }
  }

  private calculateBMI() {
    const minBmi = 18.5;
    const maxBmi = 25;
    const weight = this.stepsService.weight;
    const height = this.stepsService.height / 100;
    this.bmi = Math.round((weight / (height * height)) * 100) / 100 ;
    this.bmi = 25.5;
    this.stepsService.bmi = this.bmi;

    this.minWeight = minBmi * height * height;
    this.maxWeight = maxBmi * height * height;

    this.stepsService.targetWeight = (this.minWeight + this.maxWeight)/2;
  }

  private calculateBMR() {
    const gender = this.stepsService.selectedGender;
    const weight = this.stepsService.weight;
    const height = this.stepsService.height;
    const age = this.stepsService.selectedAge;
    const activity = this.stepsService.activity;

    if (gender == 'MALE') {
      let value = 655.1 + (9.563 * weight) + (1.85 * height) - (4.676 * age);
      this.bmr = Math.round(value * 100) / 100;
      this.calculateMaleTee(activity, age, weight, height);
    } else {
      let value = 655.1 + (4.35 * weight) + (4.7 * height) - (4.7 * age);
      this.bmr = Math.round(value * 100) / 100;
      this.calculateFemaleTee(activity, age, weight, height);
    }

    if (activity == 'SLBVJB') {
      this.optimalCaloriesIntake = this.bmr * 1.2;
    } else if (activity == 'UMJVJB') {
      this.optimalCaloriesIntake = this.bmr * 1.55;
    } else if (activity == 'INTVJEŽ') {
      this.optimalCaloriesIntake = this.bmr * 1.9;
    }

    this.optimalCaloriesIntake = parseInt(this.optimalCaloriesIntake.toFixed(2), 10);


    this.calculateAdditionalCaloriesNeeded();
  }

  private calculateMaleTee(activity: string, age: number, weight: number, height: number) {
    let pa: number = 1;
    if (activity == 'SLBVJB') {
      pa = 1.11
    } else if (activity == 'UMJVJB') {
      pa = 1.25;
    } else if (activity == 'INTVJEŽ') {
      pa = 1.48;
    }

    let value = 662 - 9.53 * age + pa * (15.91 * weight + 539.6 * (height/100));
    this.tee = Math.round(value * 100) / 100;
  }

  private calculateFemaleTee(activity: string, age: number, weight: number, height: number) {
    let pa: number = 1;
    if (activity == 'SLBVJB') {
      pa = 1.12
    } else if (activity == 'UMJVJB') {
      pa = 1.27;
    } else if (activity == 'INTVJEŽ') {
      pa = 1.45;
    }

    let value = 354 - 6.91 * age + pa * (9.36 * weight + 726 * (height/100));
    this.tee = Math.round(value * 100) / 100;
  }

  private calculateAdditionalCaloriesNeeded() {
    const goal = this.stepsService.goal;
    if (goal == 'LOSEWGH') {
      this.additionalCaloriesNeeded = 0.2 * this.optimalCaloriesIntake * (-1);
    } else if (goal == 'BEHALT' || goal == 'WGHMNT') {
      this.additionalCaloriesNeeded = 0;
    } else if (goal == 'GAINWGH') {
      this.additionalCaloriesNeeded = 0.2 * this.optimalCaloriesIntake;
    }
    this.additionalCaloriesNeeded = parseInt(this.additionalCaloriesNeeded.toFixed(2), 10);
  }
}
