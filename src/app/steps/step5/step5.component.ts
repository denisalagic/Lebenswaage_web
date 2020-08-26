import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {StepsService} from '../steps.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ApiCallsService} from '../../api-calls.service';
import {TranslateService} from "@ngx-translate/core";
import {CodebookModel} from "../../model/codebook.model";

@Component({
  selector: 'app-step5',
  templateUrl: './step5.component.html',
  styleUrls: ['./step5.component.css']
})
export class Step5Component implements OnInit {

  @Output() step5Valid = new EventEmitter<any>();
  public selectedLanguage: string;
  public checkedMealPlanSchedules: number = null;
  public mealPlanSchedules: CodebookModel[] = [];
  public comingSoonMealPlanSchedules: CodebookModel[] = [];
  public allMeals: CodebookModel[] = [];
  public selectedMealTag: string = null;

  constructor(private stepsService: StepsService,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private apiCalls: ApiCallsService,
              private translate: TranslateService) {
  }

  ngOnInit() {
    this.step5Valid.emit({
      stepPosition: 5,
      valid: false
    });

    this.apiCalls.getMealTags().subscribe(data => {
      this.mealPlanSchedules = data;
      this.mealPlanSchedules = this.mealPlanSchedules.filter(mpt => mpt.status === 'ENABLED' && mpt.files.length > 0);
      this.comingSoonMealPlanSchedules = data.filter(mpt => mpt.status === 'COMING_SOON');
    })

    this.apiCalls.getMealPlanSchedules().subscribe(data => {
      this.allMeals = data.mealPlanSchedules;
      //this.comingSoonMealPlanSchedules = data.mealPlanSchedules.filter(mpt => mpt.status === 'COMING_SOON');
      //this.mealPlanSchedules = this.mealPlanSchedules.filter(mpt => mpt.status === 'ENABLED' && mpt.files.length > 0);

    });
    this.selectedLanguage = this.translate.currentLang;
  }

  public mealPlanScheduleSelected(mealPlanTag: string) {
    let totalEnergy = this.stepsService.energyInput + this.stepsService.additionalEnergy;
    this.selectedMealTag = mealPlanTag;
    let mealType = mealPlanTag.toLowerCase().replace(' plan','');
    let filteredMeals = this.allMeals.filter((item) => item.name.toLowerCase().includes(mealType.toLowerCase()));
    let mealValue = totalEnergy > 2500 ? "2500" : (Math.floor(totalEnergy / 100) * 100).toString();
    let fm = filteredMeals.filter((meal) => meal.name.toLowerCase().includes(mealType) && meal.name.toLowerCase().includes(mealValue));
    let mealPlanId = fm[0].id;
    if (this.checkedMealPlanSchedules == null || this.checkedMealPlanSchedules != mealPlanId) {
      this.checkedMealPlanSchedules = mealPlanId;
      this.selectedMealTag = mealPlanTag;
    } else {
      this.checkedMealPlanSchedules = null;
      this.selectedMealTag = null;
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
    return this.checkedMealPlanSchedules == mealPlanScheduleId;
  }

  getMealPlanScheduleImage(mealPlanSchedule: CodebookModel): string {
    let url = '';
    mealPlanSchedule.files.forEach(file => {
      if (file.name.toLowerCase().indexOf(this.selectedLanguage.toLowerCase()) >= 0) {
        url = file.url;
      }
    });

    return url;
  }

  public getMealPlanScheduleNotesTranslation(mealPlanSchedule: CodebookModel): string {
    if (this.selectedLanguage == 'de') {
      return mealPlanSchedule.notesDE;
    } else if (this.selectedLanguage == 'hr') {
      return mealPlanSchedule.notesHR;
    } else {
      return mealPlanSchedule.notes;
    }
  }

  public getComingSoonMealPlanSchedulesTranslation(mealPlanSchedule: CodebookModel): string {
    if (this.selectedLanguage == 'de') {
      return mealPlanSchedule.nameDE;
    } else if (this.selectedLanguage == 'hr') {
      return mealPlanSchedule.nameHR;
    } else {
      return mealPlanSchedule.name;
    }
  }

}
