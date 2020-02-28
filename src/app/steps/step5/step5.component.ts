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
  public checkedMealPlanTags: string[] = [];
  public mealPlanTags: CodebookModel[] = [];


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

    this.apiCalls.getMealPlanTags().subscribe(mealPlanTags => {
      this.mealPlanTags = mealPlanTags;
      this.mealPlanTags = this.mealPlanTags.filter(mpt => mpt.files.length > 0)
    });

    this.selectedLanguage = this.translate.currentLang;
  }

  public mealTagSelected(mealPlanTag: string) {
    if (this.checkedMealPlanTags.includes(mealPlanTag)) {
      let index = this.checkedMealPlanTags.findIndex(mpt =>  mpt == mealPlanTag);
      this.checkedMealPlanTags.splice(index, 1);
    } else {
      this.checkedMealPlanTags.push(mealPlanTag);
    }
    this.stepsService.mealPlanTags = this.checkedMealPlanTags;

    if (this.checkedMealPlanTags.length > 0) {
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

  public checkIsMealPlanSelected(mealPlanTag: string) {
    let hasElement = false;
    for(let i = 0; i < this.checkedMealPlanTags.length; i++) {
      if (this.checkedMealPlanTags[i] == mealPlanTag) {
        hasElement = true;
      }
    }
    return hasElement;
  }

  getMealPlanTagImage(mealPlanTag: CodebookModel): string {
    let files = mealPlanTag.files as FileModel[];
    let wantedFile = files.filter(file => file.name.indexOf(this.selectedLanguage) != -1)[0];
    return wantedFile.url;
  }

}
