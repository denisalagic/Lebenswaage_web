import { Component, OnInit } from '@angular/core';
import {MatRadioChange, MatSliderChange} from '@angular/material';
import {StepsService} from '../steps.service';

@Component({
  selector: 'app-step3',
  templateUrl: './step3.component.html',
  styleUrls: ['./step3.component.css']
})
export class Step3Component implements OnInit {

  public height = 0;
  public weight = 0;
  public waist = 0;
  public hips = 0;
  public target = null;

  constructor(private stepsService: StepsService) { }

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

}
