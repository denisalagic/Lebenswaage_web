import { Component, OnInit } from '@angular/core';
import {MatRadioChange, MatSliderChange} from '@angular/material';
import {StepsService} from '../steps.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ApiCallsService} from '../../api-calls.service';
import {CodebookModel} from '../../model/codebook.model';

@Component({
  selector: 'app-step4',
  templateUrl: './step4.component.html',
  styleUrls: ['./step4.component.css']
})
export class Step4Component implements OnInit {

  public height = 0;
  public weight = 0;
  public waist = 0;
  public hips = 0;
  public activities: CodebookModel[] = [];
  public activityChecked: string = null;


  constructor(private stepsService: StepsService,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private apiCalls: ApiCallsService) { }

  ngOnInit() {
    this.apiCalls.getAcitivityTypes().subscribe(activities => {
      this.activities = activities;
    });
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
      this.router.navigate(['../step-5'], {relativeTo: this.activatedRoute});
    }
  }

  public nextButtonDisabled(): boolean {
    return this.height == 0 || this.weight == 0 || this.waist == 0 || this.hips == 0 || this.activityChecked == null;
  }
}
