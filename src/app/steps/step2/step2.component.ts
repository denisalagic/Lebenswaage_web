import { Component, OnInit } from '@angular/core';
import {StepsService} from '../steps.service';
import {MatSliderChange} from '@angular/material';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-step3',
  templateUrl: './step2.component.html',
  styleUrls: ['./step2.component.css']
})
export class Step2Component implements OnInit {

  public selectedGender: string = null;
  public selectedWeight: number = null;

  constructor(private stepsService: StepsService,
              private router: Router,
              private activatedRoute: ActivatedRoute) { }

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
    if (this.selectedGender != null && this.selectedWeight) {
      this.stepsService.selectedWeight = this.selectedWeight;
      this.stepsService.selectedGender = this.selectedGender;
      this.router.navigate(['../step-3'], {relativeTo: this.activatedRoute});
    }
  }

  formatLabel(value: number | null) {
    if (!value) {
      return 0;
    }

    return value;
  }

}
