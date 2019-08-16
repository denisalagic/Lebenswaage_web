import { Component, OnInit } from '@angular/core';
import {StepsService} from "../steps.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-step5',
  templateUrl: './step5.component.html',
  styleUrls: ['./step5.component.css']
})
export class Step5Component implements OnInit {

  public gdprAccepted: boolean = false;

  constructor(private stepsService: StepsService,
              private router: Router,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
  }

  public nextStep(): void {
    if (this.gdprAccepted) {
      this.stepsService.gdprAgreement = true;
      this.router.navigate(['../step-6'], {relativeTo: this.activatedRoute});
    }
  }

}
