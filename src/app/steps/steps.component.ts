import {Component, OnInit} from '@angular/core';
import {StepsService} from './steps.service';
import {QuoteModel} from "../model/quote.model";
import {TranslateService} from "@ngx-translate/core";
import {LocalApiCallsService} from "../local-api-calls.service";
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-steps',
  templateUrl: './steps.component.html',
  styleUrls: ['./steps.component.css']
})
export class StepsComponent implements OnInit {

  public activeStep = 1;
  public steps: number[] = [1, 2, 3, 4, 5, 6];
  public quotes: QuoteModel[] = [];
  public quotesEn: QuoteModel[] = [];
  public quotesDe: QuoteModel[] = [];
  public navigationDisabled: boolean = true;
  public currentPosition = 0;
  public selectedLanguage = 'en';
  disableCancelButton = false;
  constructor(private stepsService: StepsService,
              private translate: TranslateService,
              private router: Router,
              public route: ActivatedRoute,
              private localApiCallsService: LocalApiCallsService) {
    this.selectedLanguage = translate.currentLang;
    this.populateQuotesList();
    this.populateQuotesListEn();
    this.populateQuotesListDe();
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

  private populateQuotesListEn() {
    let quote1: QuoteModel = new QuoteModel('A healthy mind in a healthy body.', 'Latin');
    let quote2: QuoteModel = new QuoteModel('The wish for healing has always been half of health.', 'Seneka');
    let quote3: QuoteModel = new QuoteModel('The first wealth is health.', 'Ciceron');
    let quote4: QuoteModel = new QuoteModel('No matter how good you get you can always get better, and that\'s the exciting part.', 'T.Woods');
    let quote5: QuoteModel = new QuoteModel('Let food be thy medicine and medicine be thy food.', 'Hipokrat');
    let quote6: QuoteModel = new QuoteModel('80 percent of success is just showing up.', 'W.Allen');
    let quote7: QuoteModel = new QuoteModel('A journey of a thousand miles begins with a single step.', 'Lao Tse');

    this.quotesEn.push(quote1);
    this.quotesEn.push(quote2);
    this.quotesEn.push(quote3);
    this.quotesEn.push(quote4);
    this.quotesEn.push(quote5);
    this.quotesEn.push(quote6);
    this.quotesEn.push(quote7);
  }

  private populateQuotesListDe() {
    let quote1: QuoteModel = new QuoteModel('Nur in einem gesunden Körper wohnt ein gesunder Geist.', 'Latin');
    let quote2: QuoteModel = new QuoteModel('Der Wunsch gesund zu sein ist schon der halbe Weg.', 'Seneka');
    let quote3: QuoteModel = new QuoteModel('Die Gesundheit ist das höchste Gut.', 'Ciceron');
    let quote4: QuoteModel = new QuoteModel('Unabhängig davon wie gut Du bist, kannst Du immer noch besser werden und das ist das Aufregende daran.', 'T.Woods');
    let quote5: QuoteModel = new QuoteModel('Unsere Nahrung müsste unsere Medizin sein und umgekehrt.', 'Hipokrat');
    let quote6: QuoteModel = new QuoteModel('Achtzig Prozent des Erfolges ist es zu erscheinen.', 'W.Allen');
    let quote7: QuoteModel = new QuoteModel('Auch eine Reise von tausend Kilometern beginnt mit dem ersten Schritt.', 'Lao Tse');

    this.quotesDe.push(quote1);
    this.quotesDe.push(quote2);
    this.quotesDe.push(quote3);
    this.quotesDe.push(quote4);
    this.quotesDe.push(quote5);
    this.quotesDe.push(quote6);
    this.quotesDe.push(quote7);
  }

  public activeStepUpdate(event: any) {
    if (event.stepPosition == this.activeStep) {
      this.navigationDisabled = !event.valid;
    }
  }

  public navigateNextStep() {
    if(!this.navigationDisabled) {
      this.activeStep = this.activeStep + 1;
    }
  }

  public navigatePreviousStep() {
    if(this.activeStep > 1) {
      this.activeStep = this.activeStep - 1;
    }
  }

  public setScrollValue(value): void {
    this.currentPosition = value;
  }

  public returnMoney() {
    if (!this.disableCancelButton) {
      this.disableCancelButton = true;
      this.localApiCallsService.returnAllMoney().subscribe(resp => {
        console.log(resp);
        this.localApiCallsService.closeSession().subscribe(resp => {
          console.log("close session resp,", resp);
          this.router.navigate(['*']).then(_ => {});
        })
      });
    }
  }
}
