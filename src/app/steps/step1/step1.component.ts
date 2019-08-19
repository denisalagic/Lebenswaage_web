import { Component, OnInit } from '@angular/core';
import {StepsService} from '../steps.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-step1',
  templateUrl: './step1.component.html',
  styleUrls: ['./step1.component.css']
})
export class Step1Component implements OnInit {

  public goalPicked: number = null;

  constructor(private stepsService: StepsService,
              private router: Router,
              private activatedRoute: ActivatedRoute) { }


  ngOnInit() {
  }

  public pickGoal(goal: number) {
    this.goalPicked = goal;
    this.stepsService.goal = goal;
  }

  public nextStep(): void {
     if (this.goalPicked != null) {
       this.router.navigate(['../step-2'], {relativeTo: this.activatedRoute});
     }
  }
}
