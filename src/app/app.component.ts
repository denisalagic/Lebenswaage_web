import { Component } from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'lebens-waage';

  constructor(private translate: TranslateService,
              private router: Router,
              public route: ActivatedRoute) {
    translate.addLangs(['en', 'de', 'hr']);
    translate.setDefaultLang('en');

    translate.use('en');
  }

  public setLanguage(language: string) {
    this.translate.use(language);
  }
}
