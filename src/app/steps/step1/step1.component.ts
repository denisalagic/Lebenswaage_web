import {Component, EventEmitter, OnInit, Output, ViewEncapsulation} from '@angular/core';
import {StepsService} from '../steps.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ApiCallsService} from '../../api-calls.service';
import {CodebookModel} from '../../model/codebook.model';
import {animate, state, style, transition, trigger} from "@angular/animations";


@Component({
  selector: 'app-step1',
  templateUrl: './step1.component.html',
  styleUrls: ['./step1.component.css'],
  animations: [
    trigger('animateGoalsButton', [
      state('original', style({
        'box-shadow': '*',
      })),
      state('large', style({
        'box-shadow': '5px 10px #888888'
      })),
      transition('original => large', animate('400ms ease-in-out')),
      transition('large => original', animate('400ms ease-in-out'))
    ])
  ]
})
export class Step1Component implements OnInit {

  @Output() step1Valid = new EventEmitter<any>();

  public goalPicked: string = null;
  public goals: CodebookModel[] = [];
  states: any[] = [];

  constructor(private stepsService: StepsService,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private apiCalls: ApiCallsService) { }


  ngOnInit() {
    this.apiCalls.getGoalList().subscribe(goals => {
      this.goals = goals;
      this.states = this.goals.map(() => 'original');
    });

    this.step1Valid.emit({
      stepPosition: 1,
      valid: false
    });
  }

  public pickGoal(goal: string, i: number) {
    this.goalPicked = goal;
    this.stepsService.goal = goal;

    for(let i = 0; i < this.states.length; i++) {
      this.states[i] = 'original';
    }

    this.states[i] = 'large';

    this.step1Valid.emit({
      stepPosition: 1,
      valid: true
    });
  }

}
