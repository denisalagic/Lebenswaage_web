import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {StepsService} from '../steps.service';
import {ActivatedRoute, Router} from '@angular/router';
import {CodebookModel} from "../../model/codebook.model";
import {ApiCallsService} from "../../api-calls.service";
import {TranslateService} from "@ngx-translate/core";
import {LocalApiCallsService} from "../../local-api-calls.service";

@Component({
  selector: 'app-step3',
  templateUrl: './step3.component.html',
  styleUrls: ['./step3.component.css']
})
export class Step3Component implements OnInit {

  @Output() step3Valid = new EventEmitter<any>();


  public height = "";
  public weight = "";
  public waist = "";
  public activities: CodebookModel[] = [];
  public activityChecked: string = null;
  private selectedLanguage: string;


  constructor(private stepsService: StepsService,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private apiCalls: ApiCallsService,
              private translate: TranslateService,
              private localApiCallsService: LocalApiCallsService) {
  }

  ngOnInit() {
    this.selectedLanguage = this.translate.currentLang;


    this.apiCalls.getAcitivityTypes().subscribe(activities => {
      this.activities = activities;
    });

    this.step3Valid.emit({
      stepPosition: 3,
      valid: false
    });

    this.localApiCallsService.getMeasurments().subscribe(resp => {
      this.height = resp[0].value;
      this.onHeightChange();
      this.weight = resp[1].value;
      this.onWeightChange();
    });

  }

  public incrementValue(value: any) {
    if (value == 'height') {
      let height = this.height != '' ? parseInt(this.height, 10) : 0;
      this.height = (height + 1).toString();
      this.onHeightChange();
    } else if (value == 'weight') {
      let weight = this.weight != '' ? parseInt(this.weight, 10) : 0;
      this.weight = (weight + 1).toString();
      this.onWeightChange();
    } else if (value == 'waist') {
      let waist = this.waist != '' ? parseInt(this.waist, 10) : 0;
      this.waist = (waist + 1).toString();
      this.onWaistChange();
    }
  }

  public decrementValue(value: any) {
    if (value == 'height') {
      let height = this.height != '' ? parseInt(this.height, 10) : 0;
      if (height > 0) {
        this.height = (height - 1).toString();
        this.onHeightChange();
      }
    } else if (value == 'weight') {
      let weight = this.weight != '' ? parseInt(this.weight, 10) : 0;
      if (weight > 0) {
        this.weight = (weight - 1).toString();
        this.onWeightChange();
      }
    } else if (value == 'waist') {
      let waist = this.waist != '' ? parseInt(this.waist, 10) : 0;
      if (waist > 0) {
        this.waist = (waist - 1).toString();
        this.onWaistChange();
      }
    }
  }


  onHeightChange() {
    this.checkStepValidity();
  }

  onWeightChange() {
    this.checkStepValidity();
  }

  onWaistChange() {
    this.checkStepValidity();
  }

  onActivityChange(value: string) {
    this.activityChecked = value;
    this.stepsService.activity = value;
    this.checkStepValidity();
  }

  public getActivityTranslation(activity: CodebookModel): string {
    if (this.selectedLanguage == 'de') {
      return activity.nameDE;
    } else if (this.selectedLanguage == 'hr') {
      return activity.nameHR;
    } else {
      return activity.name;
    }
  }

  public getActivityNotesTranslation(activity: CodebookModel): string {
    if (this.selectedLanguage == 'de') {
      return activity.notesDE;
    } else if (this.selectedLanguage == 'hr') {
      return activity.notesHR;
    } else {
      return activity.notes;
    }
  }

  private checkStepValidity() {
    if (parseInt(this.height, 10) > 0 && parseInt(this.weight, 10) > 0 && parseInt(this.waist, 10) > 0 && this.activityChecked != null) {
      this.stepsService.height = parseInt(this.height, 10);
      this.stepsService.weight = parseInt(this.weight, 10);
      this.stepsService.waist = parseInt(this.waist, 10);

      this.step3Valid.emit({
        stepPosition: 3,
        valid: true
      });
    } else {
      this.step3Valid.emit({
        stepPosition: 3,
        valid: false
      });
    }
  }

}
