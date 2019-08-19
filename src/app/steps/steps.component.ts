import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {StepsService} from './steps.service';

@Component({
  selector: 'app-steps',
  templateUrl: './steps.component.html',
  styleUrls: ['./steps.component.css']
})
export class StepsComponent implements OnInit {

  public activeStep = 1;

  constructor(private stepsService: StepsService,
              private router: Router,
              private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.stepsService.resetProperties();

    this.router.events.subscribe((val) => {
      // see also
      if (val instanceof NavigationEnd) {
        const stepActive = val.url.split('/')[val.url.split('/').length - 1].split('-')[1];
        this.activeStep = parseInt(stepActive, 10);
      }
    });
    this.router.navigate(['step-1'], {relativeTo: this.activatedRoute});
  }

}
