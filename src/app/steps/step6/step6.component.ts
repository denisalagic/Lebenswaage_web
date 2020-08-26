import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {StepsService} from "../steps.service";
import {CodebookModel} from "../../model/codebook.model";
import {ApiCallsService} from "../../api-calls.service";
import {FileModel} from "../../model/file.model";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-step6',
  templateUrl: './step6.component.html',
  styleUrls: ['./step6.component.css']
})
export class Step6Component implements OnInit {
  @Output() step6Valid = new EventEmitter<any>();

  public selectedExerciseGroup: number;
  public exerciseGroups: any[] = [];
  public selectedLanguage: string;

  constructor(private stepsService: StepsService,
              private apiCalls: ApiCallsService,
              private translate: TranslateService) {
  }

  ngOnInit() {
    this.step6Valid.emit({
      stepPosition: 6,
      valid: true
    });

    this.apiCalls.getExerciseGroups().subscribe(exerciseGroups => {
      this.exerciseGroups = exerciseGroups;
      this.exerciseGroups = this.exerciseGroups.filter(mpt => mpt.files.length > 0);
    });
    this.selectedLanguage = this.translate.currentLang;
  }

  exerciseGroupSelected(exerciseGroup: number) {
    this.selectedExerciseGroup = this.selectedExerciseGroup == exerciseGroup ? null : exerciseGroup;
    this.stepsService.trainingType = exerciseGroup.toString();
  }

  getExerciseGroupImage(exerciseGroup: any): string {
    let files = exerciseGroup.files as FileModel[];
    let wantedFile = files.filter(file => file.name.indexOf(this.selectedLanguage) != -1)[0];
    return wantedFile.url;
  }
  private getCurrentlySelectedLanguageImage(files: any[]): string {
    let url: string = null;
    if(this.selectedLanguage != 'en') {
      files.forEach(file => {
        if (file.name.indexOf(this.selectedLanguage) >= 0){
          url = file.url;
        }
      });
    }

    if(url == null) {
      url = files.find(f => (f.name.indexOf("_de") == -1 && f.name.indexOf("_hr") == -1)).url;
    }
    return url;
  }
}
