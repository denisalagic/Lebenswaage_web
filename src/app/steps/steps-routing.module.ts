import { Routes, RouterModule } from '@angular/router';
import {StepsComponent} from './steps.component';


const routes: Routes = [
  {path: '', component: StepsComponent},
];

export const stepsAppRoutes = RouterModule.forChild(routes);

