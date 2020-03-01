import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {StepsService} from '../steps.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ApiCallsService} from '../../api-calls.service';
import {TranslateService} from "@ngx-translate/core";
import {CodebookModel} from "../../model/codebook.model";
import {FileModel} from "../../model/file.model";

@Component({
  selector: 'app-step5',
  templateUrl: './step5.component.html',
  styleUrls: ['./step5.component.css']
})
export class Step5Component implements OnInit {

  @Output() step5Valid = new EventEmitter<any>();
  public selectedLanguage: string;
  // public checkedMealPlanSchedules: number[] = [];
  public checkedMealPlanSchedules: number = null;
  public mealPlanSchedules: CodebookModel[] = [];


  constructor(private stepsService: StepsService,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private apiCalls: ApiCallsService,
              private translate: TranslateService) { }

  ngOnInit() {
    this.step5Valid.emit({
      stepPosition: 5,
      valid: false
    });

    this.apiCalls.getMealPlanSchedules().subscribe(data => {
      this.mealPlanSchedules = data.mealPlanSchedules;
      this.mealPlanSchedules = this.mealPlanSchedules.filter(mpt => mpt.files.length > 0);
    });

    this.selectedLanguage = this.translate.currentLang;
  }

  public mealPlanScheduleSelected(mealPlanId: number) {
    /*if (this.checkedMealPlanSchedules.includes(mealPlanId)) {
      let index = this.checkedMealPlanSchedules.findIndex(mpt =>  mpt == mealPlanId);
      this.checkedMealPlanSchedules.splice(index, 1);
    } else {
      this.checkedMealPlanSchedules.push(mealPlanId);
    }*/

    if(this.checkedMealPlanSchedules == null || this.checkedMealPlanSchedules != mealPlanId) {
      this.checkedMealPlanSchedules = mealPlanId;
    } else {
      this.checkedMealPlanSchedules = null;
    }

    this.stepsService.mealPlanScheduleId = this.checkedMealPlanSchedules;

    if (this.checkedMealPlanSchedules != null) {
      this.step5Valid.emit({
        stepPosition: 5,
        valid: true
      });
    } else {
      this.step5Valid.emit({
        stepPosition: 5,
        valid: false
      });
    }
  }

  public checkIsMealPlanSelected(mealPlanScheduleId: number) {
    /*let hasElement = false;
    for(let i = 0; i < this.checkedMealPlanSchedules.length; i++) {
      if (this.checkedMealPlanSchedules[i] == mealPlanScheduleId) {
        hasElement = true;
      }
    }
    return hasElement;*/
    return this.checkedMealPlanSchedules == mealPlanScheduleId;
  }

  getMealPlanScheduleImage(mealPlanSchedule: CodebookModel): string {
    let files = mealPlanSchedule.files as any[];
    // let wantedFile = files.filter(file => file.name.indexOf(this.selectedLanguage) != -1)[0];
    return files[0];
  }

}
