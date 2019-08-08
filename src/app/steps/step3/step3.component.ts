import { Component, OnInit } from '@angular/core';
import {StepsService} from '../steps.service';
import {MatSliderChange} from '@angular/material';

@Component({
  selector: 'app-step3',
  templateUrl: './step3.component.html',
  styleUrls: ['./step3.component.css']
})
export class Step3Component implements OnInit {

  public selectedGender: string = null;
  public selectedWeight: number = null;

  constructor(private stepsService: StepsService) { }

  ngOnInit() {
  }

  public selectGender(gender: string): void {
    this.selectedGender = gender;
    this.stepsService.selectedGender = gender;
  }

  onInputChange(event: MatSliderChange) {
    this.selectedWeight = event.value;
    this.stepsService.selectedWeight = event.value;
  }

  public nextStep(): void {

  }

  formatLabel(value: number | null) {
    if (!value) {
      return 0;
    }

    return value;
  }

}
