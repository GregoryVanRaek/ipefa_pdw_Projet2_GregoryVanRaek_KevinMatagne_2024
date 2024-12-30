import { Routes } from '@angular/router';
import {StaffFallbackPageComponent} from './page';
import {AppNode} from '../../common';
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
        path:AppNode.LIST,
        loadComponent: () => import('./page').then(c => c.StaffListPageComponent)
      },
      {
        path:'**',
        component:StaffFallbackPageComponent
      }
    ]
  }
]
