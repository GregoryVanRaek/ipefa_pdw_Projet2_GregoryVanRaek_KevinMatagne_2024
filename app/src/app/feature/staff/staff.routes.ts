import { Routes } from '@angular/router';
import {StaffFallbackPageComponent} from './page';
import {AppNode} from '../../common';
import {RouterPageComponent} from '../router';
import {staffCreateGuard} from './guard';

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
        path:`${AppNode.DETAIL}/:id`,
        canDeactivate:[staffCreateGuard],
        loadComponent: () => import('./page').then(c => c.StaffDetailPageComponent)
      },
      {
        path: `${AppNode.CREATE}`,
        canDeactivate:[staffCreateGuard],
        loadComponent: () => import('./page').then(c => c.StaffCreatePageComponent)
      },
      {
        path:'**',
        component:StaffFallbackPageComponent
      }
    ]
  }
]
