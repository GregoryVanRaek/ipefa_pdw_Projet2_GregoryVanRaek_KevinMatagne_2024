import { Routes } from '@angular/router';
import { DashboardFallBackPageComponent } from './page';
import {RouterPageComponent} from '../router';

export const dashboardRoutes: Routes = [
  {
    path:'',
    component:RouterPageComponent,
    children:[
      {
        path:'',
        pathMatch: 'full',
        loadComponent: () => import('./page').then(c => c.DashboardHomePageComponent)
      },
      {
        path:'**',
        component:DashboardFallBackPageComponent
      },
    ]},
]
