import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {MatRadioChange, MatSliderChange} from '@angular/material';
import {StepsService} from '../steps.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ApiCallsService} from '../../api-calls.service';
import {CodebookModel} from '../../model/codebook.model';
import {FormControl} from '@angular/forms';
import {ReplaySubject, Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

@Component({
  selector: 'app-step4',
  templateUrl: './step4.component.html',
  styleUrls: ['./step4.component.css']
})
export class Step4Component implements OnInit, OnDestroy {
  @Output() step4Valid = new EventEmitter<any>();


  public height = 0;
  public weight = 0;
  public waist = 0;
  public hips = 0;
  public activities: CodebookModel[] = [];
  public mealPlanTags: CodebookModel[] = [];
  public activityChecked: string = null;

  /** control for the selected bank for multi-selection */
  public mealPlanTagCtrl: FormControl = new FormControl();

  /** control for the MatSelect filter keyword multi-selection */
  public mealPlanTagFilterCtrl: FormControl = new FormControl();

  /** list of banks filtered by search keyword */
  public filteredMealPlanTagsMulti: ReplaySubject<CodebookModel[]> = new ReplaySubject<CodebookModel[]>(1);

  // tslint:disable-next-line:variable-name
  protected _onDestroy = new Subject<void>();

  constructor(private stepsService: StepsService,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private apiCalls: ApiCallsService) { }

  ngOnInit() {
    this.apiCalls.getAcitivityTypes().subscribe(activities => {
      this.activities = activities;
    });

    this.apiCalls.getMealPlanTags().subscribe(mealPlanTags => {
      this.mealPlanTags = mealPlanTags;
      this.filteredMealPlanTagsMulti.next(mealPlanTags.slice());
    });

    // listen for search field value changes
    this.mealPlanTagFilterCtrl.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.filterBanksMulti();
      });
  }

  ngOnDestroy() {
    this._onDestroy.next();
    this._onDestroy.complete();
  }

  onHeightChange(event: any) {
    if (event.value != undefined) {
      this.height = event.value;
    } else {
      this.height = event.target.value;
    }
    this.stepsService.height = this.height;
  }

  onWeightChange(event: any) {
    if (event.value != undefined) {
      this.weight = event.value;
    } else {
      this.weight = event.target.value;
    }
    this.stepsService.weight = this.weight;
  }

  onWaistChange(event: any) {
    if (event.value != undefined) {
      this.waist = event.value;
    } else {
      this.waist = event.target.value;
    }
    this.stepsService.waist = this.waist;
  }

  onHipsChange(event: any) {
    if (event.value != undefined) {
      this.hips = event.value;
    } else {
      this.hips = event.target.value;
    }
    this.stepsService.hips = this.hips;
  }

  onActivityChange(event: MatRadioChange) {
    this.stepsService.activity = event.value;
  }

  public nextStep(): void {
    if (this.height > 0 && this.weight > 0 && this.waist > 0 && this.hips > 0 && this.activityChecked != null) {
      this.stepsService.mealPlanTags = this.mealPlanTagCtrl.value;
      this.router.navigate(['../step-5'], {relativeTo: this.activatedRoute});
    }
  }

  public nextButtonDisabled(): boolean {
    return this.height == 0 || this.weight == 0 || this.waist == 0 || this.hips == 0 || this.activityChecked == null;
  }

  protected filterBanksMulti() {
    if (!this.mealPlanTags) {
      return;
    }
    // get the search keyword
    let search = this.mealPlanTagFilterCtrl.value;
    if (!search) {
      this.filteredMealPlanTagsMulti.next(this.mealPlanTags.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    // filter the banks
    this.filteredMealPlanTagsMulti.next(
      this.mealPlanTags.filter(mpt => mpt.name.toLowerCase().indexOf(search) > -1 || mpt.code.toLowerCase().indexOf(search) > -1)
    );
  }
}
