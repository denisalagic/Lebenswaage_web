import {Component, OnInit} from '@angular/core';
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
  }

  private populateQuotesList() {
    let quote1: QuoteModel = new QuoteModel('U zdravom tijelu zdrav duh!', 'Latinska');
    let quote2: QuoteModel = new QuoteModel('Želja za zdravljem je pola zdravlja.', 'Seneka');
    let quote3: QuoteModel = new QuoteModel('Zdravlje je najveće bogatstvo.', 'Ciceron');
    let quote4: QuoteModel = new QuoteModel('Bez obzira koliko si dobar, uvijek možeš postati bolji i to je uzbudljiv dio.', 'T.Woods');
    let quote5: QuoteModel = new QuoteModel('Naša hrana bi trebala biti naš lijek i obratno.', 'Hipokrat');
    let quote6: QuoteModel = new QuoteModel('Osamdeset posto uspjeha je pojaviti se.', 'W.Allen');
    let quote7: QuoteModel = new QuoteModel('I putovanje od tisuću kilometara započinje prvim korakom.', 'Lao Tse');

    this.quotes.push(quote1);
    this.quotes.push(quote2);
    this.quotes.push(quote3);
    this.quotes.push(quote4);
    this.quotes.push(quote5);
    this.quotes.push(quote6);
    this.quotes.push(quote7);
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
