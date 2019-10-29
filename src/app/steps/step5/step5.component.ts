import { Component, OnInit } from '@angular/core';
import {StepsService} from '../steps.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ApiCallsService} from '../../api-calls.service';
import {CodebookModel} from '../../model/codebook.model';

@Component({
  selector: 'app-step5',
  templateUrl: './step5.component.html',
  styleUrls: ['./step5.component.css']
})
export class Step5Component implements OnInit {

  public checkedFoodTypes: string[] = [];
  public blacklistedFoodTypes: CodebookModel[] = [];
  public minWeight: number = 0;
  public maxWeight: number = 0;
  public optimalCaloriesIntake: number = 0;
  public additionalCaloriesNeeded: number = 0;


  constructor(private stepsService: StepsService,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private apiCalls: ApiCallsService) { }

  ngOnInit() {
    this.apiCalls.getBlacklistedFoodTypes().subscribe(foodTypes => {
      this.blacklistedFoodTypes = foodTypes;
    });

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
  }

  public nextStep(): void {
    this.stepsService.foodsNotIncluded = this.checkedFoodTypes;
    this.router.navigate(['../step-6'], {relativeTo: this.activatedRoute});
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

  private calculateBMI() {
    const minBmi = 18.5;
    const maxBmi = 25;
    const weight = this.stepsService.weight;
    const height = this.stepsService.height / 100;
    this.stepsService.bmi = weight / (height * height);

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

    let baseBmr: number = 0;
    if (gender == 'MALE') {
      baseBmr = 655.1 + (9.563 * weight) + (1.85 * height) - (4.676 * age);
    } else {
      baseBmr = 655.1 + (4.35 * weight) + (4.7 * height) - (4.7 * age);
    }

    if (activity == 'SLBVJB') {
      this.optimalCaloriesIntake = baseBmr * 1.2;
    } else if (activity == 'UMJVJB') {
      this.optimalCaloriesIntake = baseBmr * 1.55;
    } else if (activity == 'INTVJEŽ') {
      this.optimalCaloriesIntake = baseBmr * 1.9;
    }

    this.calculateAdditionalCaloriesNeeded();
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
  }

}
