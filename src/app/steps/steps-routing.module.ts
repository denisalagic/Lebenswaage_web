import { Routes, RouterModule } from '@angular/router';
import {StepsComponent} from './steps.component';
import {Step1Component} from "./step1/step1.component";
import {Step2Component} from "./step2/step2.component";


const routes: Routes = [
  {path: '', component: StepsComponent,
    children: [
      {path: 'step-1', component: Step1Component},
      {path: 'step-2', component: Step2Component},
    ]
  },
];

export const stepsAppRoutes = RouterModule.forChild(routes);

