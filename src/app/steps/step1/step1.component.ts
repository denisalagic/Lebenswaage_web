import { Component, OnInit } from '@angular/core';
import {StepsService} from '../steps.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ApiCallsService} from '../../api-calls.service';
import {CodebookModel} from '../../model/codebook.model';

@Component({
  selector: 'app-step1',
  templateUrl: './step1.component.html',
  styleUrls: ['./step1.component.css']
})
export class Step1Component implements OnInit {

  public goalPicked: string = null;
  public goals: CodebookModel[] = [];

  constructor(private stepsService: StepsService,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private apiCalls: ApiCallsService) { }


  ngOnInit() {
    this.apiCalls.getGoalList().subscribe(goals => {
      this.goals = goals;
    });
  }

  public pickGoal(goal: string) {
    this.goalPicked = goal;
    this.stepsService.goal = goal;
  }

  public nextStep(): void {
     if (this.goalPicked != null) {
       this.router.navigate(['../step-2'], {relativeTo: this.activatedRoute});
     }
  }
}
