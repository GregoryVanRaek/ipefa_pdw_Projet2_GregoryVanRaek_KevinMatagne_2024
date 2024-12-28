import { Routes } from '@angular/router';
import { HomeRouterComponent } from './router';
import { HomeFallbackPageComponent } from './page/home-fallback-page/home-fallback-page.component';

export const homeRoutes: Routes = [
  {
    path: '',
    component: HomeRouterComponent,
    children:[
      {
        path:'',
        loadComponent: () => import('./page').then(c => c.HomePageComponent)
      },
      {
        path:'**',
        component:HomeFallbackPageComponent,
      }
  ]
  }
]
