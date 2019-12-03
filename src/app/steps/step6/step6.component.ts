import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {StepsService} from "../steps.service";
import {CodebookModel} from "../../model/codebook.model";
import {ApiCallsService} from "../../api-calls.service";

@Component({
  selector: 'app-step6',
  templateUrl: './step6.component.html',
  styleUrls: ['./step6.component.css']
})
export class Step6Component implements OnInit {
  @Output() step6Valid = new EventEmitter<any>();

  public selectedTrainingType: string;
  public trainingTypes: CodebookModel[] = [];

  constructor(private stepsService: StepsService,
              private apiCalls: ApiCallsService) {
  }

  ngOnInit() {
    this.step6Valid.emit({
      stepPosition: 6,
      valid: false
    });

    this.apiCalls.getTrainingTypes().subscribe(trainingTypes => {
      this.trainingTypes = trainingTypes;
    });
  }

  trainingTypeSelected(trainingType: string) {
    this.selectedTrainingType = trainingType;
    this.stepsService.trainingType = trainingType;
    this.step6Valid.emit({
      stepPosition: 6,
      valid: true
    });
  }

  getVideoUrl(mealPlanTag: CodebookModel) {
    let files = mealPlanTag.files as string[];
    return files.find(file => file.indexOf('mp4') != -1)
  }
}
