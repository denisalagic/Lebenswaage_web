import { Component, OnInit } from '@angular/core';
import {StepsService} from '../steps.service';
import {MatSliderChange} from '@angular/material';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-step3',
  templateUrl: './step3.component.html',
  styleUrls: ['./step3.component.css']
})
export class Step3Component implements OnInit {

  public selectedGender: string = null;
  public selectedAge: number = null;

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
    this.selectedAge = event.value;
    this.stepsService.selectedAge = event.value;
  }

  public nextStep(): void {
    if (this.selectedGender != null && this.selectedAge) {
      this.stepsService.selectedAge = this.selectedAge;
      this.stepsService.selectedGender = this.selectedGender;
      this.router.navigate(['../step-4'], {relativeTo: this.activatedRoute});
    }
  }

  formatLabel(value: number | null) {
    if (!value) {
      return 0;
    }

    return value;
  }

}
