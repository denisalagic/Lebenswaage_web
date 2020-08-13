import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {StepsComponent} from './steps.component';
import {stepsAppRoutes} from './steps-routing.module';
import {TranslateModule} from '@ngx-translate/core';
import {
  MatButtonModule,
  MatCardModule,
  MatCheckboxModule,
  MatDialogModule,
  MatExpansionModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatRadioModule,
  MatSelectModule,
  MatSliderModule,
  MatStepperModule
} from '@angular/material';
import {Step3Component} from './step3/step3.component';
import {Step2Component} from './step2/step2.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {Step4Component} from './step4/step4.component';
import {Step5Component} from './step5/step5.component';
import {Step6Component} from './step6/step6.component';
import {Step7Component} from './step7/step7.component';
import {Step1Component} from './step1/step1.component';
import {NgxMatSelectSearchModule} from 'ngx-mat-select-search';
import {IKeyboardLayouts, keyboardLayouts, MAT_KEYBOARD_LAYOUTS, MatKeyboardModule} from '@ngx-material-keyboard/core';
import {GdprModalComponent} from './step7/gdpr-modal/gdpr-modal.component';
import {ScrollDirective} from "../scroll.directive";

const customLayouts: IKeyboardLayouts = {
  ...keyboardLayouts,
  'numberLayout': {
    'name': 'Awesome layout',
    'keys': [
      [
        ['1'],
        ['2'],
        ['3']
      ],
      [
        ['4'],
        ['5'],
        ['6']
      ],
      [
        ['7'],
        ['8'],
        ['9']
      ],
      [
        [' '],
        ['0'],
        ['Backspace']
      ]
    ],
    'lang': ['en-UK']
  }
};


@NgModule({
  declarations: [
    StepsComponent,
    Step2Component,
    Step3Component,
    Step4Component,
    Step4Component,
    Step5Component,
    Step6Component,
    Step7Component,
    Step1Component,
    GdprModalComponent,
    ScrollDirective
  ],
  imports: [
    CommonModule,
    stepsAppRoutes,
    TranslateModule.forChild(),
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatStepperModule,
    MatIconModule,
    MatSliderModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    MatCheckboxModule,
    MatCardModule,
    MatSelectModule,
    NgxMatSelectSearchModule,
    MatKeyboardModule,
    MatExpansionModule,
    MatDialogModule
  ],
  providers: [
    {provide: MAT_KEYBOARD_LAYOUTS, useValue: customLayouts}
  ],
  entryComponents: [GdprModalComponent],
  bootstrap: [StepsComponent]

})
export class StepsModule {
}
