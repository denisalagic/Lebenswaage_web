import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {StepsComponent} from './steps.component';
import {Step1Component} from './step1/step1.component';
import {stepsAppRoutes} from './steps-routing.module';
import {TranslateModule} from '@ngx-translate/core';
import {MatButtonModule, MatStepperModule} from '@angular/material';
import { Step2Component } from './step2/step2.component';



@NgModule({
  declarations: [
    StepsComponent,
    Step1Component,
    Step2Component,
  ],
  imports: [
    CommonModule,
    stepsAppRoutes,
    TranslateModule.forChild(),
    MatButtonModule,
    MatStepperModule
  ],
  bootstrap: [StepsComponent]

})
export class StepsModule { }
