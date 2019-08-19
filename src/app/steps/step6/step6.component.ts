import { Component, OnInit } from '@angular/core';
import {StepsService} from '../steps.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-step6',
  templateUrl: './step6.component.html',
  styleUrls: ['./step6.component.css']
})
export class Step6Component implements OnInit {

  public gdprAccepted = false;

  constructor(private stepsService: StepsService,
              private router: Router,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
  }

  public nextStep(): void {
    if (this.gdprAccepted) {
      this.stepsService.gdprAgreement = true;
      this.router.navigate(['../step-7'], {relativeTo: this.activatedRoute});
    }
  }

}
