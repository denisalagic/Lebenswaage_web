import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {StepsService} from '../steps.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ApiCallsService} from '../../api-calls.service';
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-step5',
  templateUrl: './step5.component.html',
  styleUrls: ['./step5.component.css']
})
export class Step5Component implements OnInit {

  @Output() step5Valid = new EventEmitter<any>();
  public selectedLanguage: string;
  public mealTagCount: number[] = [];


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

    for (let i = 1; i <= 23; i++) {
      this.mealTagCount.push(i);
    }

    this.selectedLanguage = this.translate.currentLang;
  }

  public mealTagSelected(index: number) {
    console.log("Meal tag selected: ", index);

    this.step5Valid.emit({
      stepPosition: 5,
      valid: true
    });
  }

}
