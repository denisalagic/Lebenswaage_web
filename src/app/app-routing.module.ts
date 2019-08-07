import { Routes, RouterModule } from '@angular/router';
import {AppComponent} from './app.component';


const routes: Routes = [
  {path: '*', component: AppComponent},
  {path: 'steps', loadChildren: './steps/steps.module#StepsModule'}

];

export const appRoutes = RouterModule.forRoot(routes);

