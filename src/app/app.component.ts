import {AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {ActivatedRoute, Router} from '@angular/router';
import {animate, state, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    trigger('animateStartButton', [
      state('original', style({
        width: '*',
        height: '*'
      })),
      state('large', style({
        width: '449px',
        height: '162px'
      })),
      transition('original => large', animate('400ms ease-in-out')),
      transition('large => original', animate('400ms ease-in-out'))
    ])
  ]
})
export class AppComponent implements AfterViewInit{
  title = 'lebens-waage';

  @ViewChild('videoPlayer', {static: false}) videoplayer: ElementRef;


  public selectedLanguage: string;
  public moneyAmount: number = 0;
  moneyAmountAnimation: string = 'original';


  constructor(private translate: TranslateService,
              private router: Router,
              public route: ActivatedRoute) {
    translate.addLangs(['en', 'de', 'hr']);
    translate.setDefaultLang('en');
    translate.use('en');
    this.selectedLanguage = 'en';
    this.moneyAmountAnimation = 'original';

  }

  ngAfterViewInit(): void {
    this.videoplayer.nativeElement.play();
  }



  public setLanguage(language: string) {
    this.translate.use(language);
    this.selectedLanguage = language;
  }

  public incrementAmount() {
    this.moneyAmount += 5;
    if(this.moneyAmount >= 10) {
      this.moneyAmountAnimation = 'large';
      setTimeout(() => {
        this.moneyAmountAnimation = 'original';
      }, 500)
    }
  }

  public navigateToSteps() {
    if(this.moneyAmount >= 10) {
      this.router.navigate(['steps']);
    }
  }

}
