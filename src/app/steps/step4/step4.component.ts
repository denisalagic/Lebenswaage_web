import { Component, OnInit } from '@angular/core';
import {MatRadioChange, MatSliderChange} from '@angular/material';
import {StepsService} from '../steps.service';
import {ActivatedRoute, Router} from '@angular/router';

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
  public target = null;


  constructor(private stepsService: StepsService,
              private router: Router,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
  }

  onHeightChange(event: MatSliderChange) {
    this.height = event.value;
    this.stepsService.height = event.value;
  }

  onWeightChange(event: MatSliderChange) {
    this.weight = event.value;
    this.stepsService.weight = event.value;
  }

  onWaistChange(event: MatSliderChange) {
    this.waist = event.value;
    this.stepsService.waist = event.value;
  }

  onHipsChange(event: MatSliderChange) {
    this.hips = event.value;
    this.stepsService.hips = event.value;
  }

  onTargetChange(event: MatRadioChange) {
    this.stepsService.target = event.value;
  }

  public nextStep(): void {
    if (this.height > 0 && this.weight > 0 && this.waist > 0 && this.hips > 0 && this.target != null) {
      this.router.navigate(['../step-5'], {relativeTo: this.activatedRoute});
    }
  }

  public nextButtonDisabled(): boolean {
    return this.height == 0 || this.weight == 0 || this.waist == 0 || this.hips == 0 || this.target == null;
  }
}
