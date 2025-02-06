import { Routes } from '@angular/router';

import {RouterPageComponent} from '../router';

import {StaffFallbackPageComponent} from '../staff/page';
import {siteCreateGuard} from './guard';
import {AppNode} from '../../common';
import {invoiceCreateGuard} from '../invoice/guard/invoice-create.guard';

export const siteRoutes: Routes = [
  {
    path: '',
    component: RouterPageComponent,
    children:[
      {
        path:'',
        loadComponent: () =>import('./page').then(c=>c.SiteOverviewPageComponent),
        canDeactivate:[invoiceCreateGuard]
      },
      {
        path:`${AppNode.DETAIL}/:siteId/:invoiceId`,
        loadComponent:()=>import('./../invoice/page').then(c=>c.InvoiceDetailPageComponent),
        canDeactivate:[invoiceCreateGuard]
      },
      {
        path:`${AppNode.DETAIL}/:id`,
        canDeactivate:[siteCreateGuard],
        loadComponent:() =>import('./page').then(c=>c.SiteDetailPageComponent)
      },
      {
        path:'create',
        canDeactivate:[siteCreateGuard],
        loadComponent:()=>import('./page').then(c=>c.SiteCreatePageComponent)},

      {
        path:'**',
        component:StaffFallbackPageComponent
      }
    ]
  }
]
