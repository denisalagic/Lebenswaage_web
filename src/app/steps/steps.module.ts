import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {StepsComponent} from './steps.component';
import {Step1Component} from './step1/step1.component';
import {stepsAppRoutes} from './steps-routing.module';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {MatButtonModule, MatStepperModule} from '@angular/material';



@NgModule({
  declarations: [
    StepsComponent,
    Step1Component,
  ],
  imports: [
    CommonModule,
    stepsAppRoutes,
    TranslateModule.forChild(),
    MatButtonModule
  ],
  bootstrap: [StepsComponent]

})
export class StepsModule { }
