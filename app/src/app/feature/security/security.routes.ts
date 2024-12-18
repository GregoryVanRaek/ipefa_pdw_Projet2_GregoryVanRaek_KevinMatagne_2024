import { Routes } from '@angular/router';
import { AppNode } from '../../common';
import { SecurityRouterComponent } from './router';
import { SecurityFallBackPageComponent } from './page/security-fall-back-page/security-fall-back-page.component';

export const securityRoutes: Routes = [
  {
    path:'',
    component:SecurityRouterComponent,
    children:[
      {
        path : '',
        pathMatch: 'full',
        redirectTo: AppNode.SIGN_IN
      },
      {
        path:AppNode.SIGN_IN,
        loadComponent: () => import('./page').then(c => c.SigninPageComponent)
      },
      {
        path:AppNode.SIGN_UP,
        loadComponent: () => import('./page').then(c => c.SignupPageComponent)
      },
      {
        path:'**',
        component:SecurityFallBackPageComponent
      }
    ],
  }
]

