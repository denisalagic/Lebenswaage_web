import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {StepsService} from './steps.service';
import {QuoteModel} from "../model/quote.model";

@Component({
  selector: 'app-steps',
  templateUrl: './steps.component.html',
  styleUrls: ['./steps.component.css']
})
export class StepsComponent implements OnInit {

  public activeStep = 1;
  public steps: number[] = [1, 2, 3, 4, 5, 6];
  public quotes: QuoteModel[] = [];
  public navigationDisabled: boolean = true;

  constructor(private stepsService: StepsService) {
    this.populateQuotesList();
  }

  ngOnInit() {
    this.stepsService.resetProperties();

    // this.router.events.subscribe((val) => {
    //   // see also
    //   if (val instanceof NavigationEnd) {
    //     const stepActive = val.url.split('/')[val.url.split('/').length - 1].split('-')[1];
    //     this.activeStep = parseInt(stepActive, 10);
    //   }
    // });
    // this.router.navigate(['step-1'], {relativeTo: this.activatedRoute});
  }

  private populateQuotesList() {
    let quote1: QuoteModel = new QuoteModel('U zdravom tijelu zdrav duh!', 'Latinska');
    let quote2: QuoteModel = new QuoteModel('Želja za zdravljem je pola zdravlja.', 'Seneka');
    this.quotes.push(quote1);
    this.quotes.push(quote2);
  }

  public activeStepUpdate(event: any) {
    console.log(event);
    if (event.stepPosition == this.activeStep) {
      this.navigationDisabled = !event.valid;
    }
  }

  public navigateNextStep() {
    if(!this.navigationDisabled) {
      this.activeStep = this.activeStep + 1;
    }
  }
}
