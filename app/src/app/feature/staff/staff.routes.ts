import { Routes } from '@angular/router';
import {StaffFallbackPageComponent} from './page';
import {AppNode, AppRoutes} from '../../common';
import {RouterPageComponent} from '../router';

export const staffRoutes: Routes = [
  {
    path: '',
    component: RouterPageComponent,
    children:[
      {
        path:'',
        loadComponent: () => import('./page').then(c => c.StaffOverviewPageComponent)
      },
      {
        path:`${AppRoutes.STAFFDETAIL}/:id`,
        loadComponent: () => import('./page').then(c => c.StaffDetailPageComponent)
      },
      {
        path:'**',
        component:StaffFallbackPageComponent
      }
    ]
  }
]
