import { Component, OnInit } from '@angular/core';
import {StepsService} from "../steps.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-step4',
  templateUrl: './step4.component.html',
  styleUrls: ['./step4.component.css']
})
export class Step4Component implements OnInit {

  public foodsNotIncluded = null;


  constructor(private stepsService: StepsService,
              private router: Router,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
  }

  public pickFood(foodIndex: number) {
    this.foodsNotIncluded = foodIndex;
    this.stepsService.foodsNotIncluded = this.foodsNotIncluded;
  }

  public nextStep(): void {
    if (this.foodsNotIncluded != null) {
      this.router.navigate(['../step-5'], {relativeTo: this.activatedRoute});
    }
  }

}
