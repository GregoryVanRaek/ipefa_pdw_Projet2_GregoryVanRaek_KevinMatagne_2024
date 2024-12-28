import { Routes } from '@angular/router';
import { DashboardFallBackPageComponent } from './page';
import { DashboardRouterComponent } from './router';

export const dashboardRoutes: Routes = [
  {
    path:'',
    component:DashboardRouterComponent,
    children:[
      {
        path:'',
        loadComponent: () => import('./page').then(c => c.DashboardHomePageComponent)
      },
      {
        path:'**',
        component:DashboardFallBackPageComponent
      },
    ]},
]
