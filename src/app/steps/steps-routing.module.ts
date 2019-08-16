import { Routes, RouterModule } from '@angular/router';
import {StepsComponent} from './steps.component';
import {Step2Component} from './step2/step2.component';
import {Step1Component} from './step1/step1.component';
import {Step3Component} from './step3/step3.component';
import {Step4Component} from "./step4/step4.component";
import {Step5Component} from "./step5/step5.component";
import {Step6Component} from "./step6/step6.component";


const routes: Routes = [
  {path: '', component: StepsComponent,
    children: [
      {path: 'step-1', component: Step1Component},
      {path: 'step-2', component: Step2Component},
      {path: 'step-3', component: Step3Component},
      {path: 'step-4', component: Step4Component},
      {path: 'step-5', component: Step5Component},
      {path: 'step-6', component: Step6Component}
    ]
  },
];

export const stepsAppRoutes = RouterModule.forChild(routes);

