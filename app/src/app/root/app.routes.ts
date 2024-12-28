import { Routes } from '@angular/router';
import { DashboardGuard, SecurityGuard } from '../feature';
import { GlobalFallBackPageComponent } from '@shared/ui';
import { AppNode } from '../common';

export const routes: Routes = [
  {
    path: '',
    redirectTo:AppNode.HOME,
    pathMatch: 'full',
  },
  {
    path:AppNode.HOME,
    loadChildren: () => import('../feature/home').then(r => r.homeRoutes)
  },
  {
    path: AppNode.REDIRECT_TO_PUBLIC,
    canActivate: [SecurityGuard()],
    loadChildren: () => import('../feature/security').then(r => r.securityRoutes),
  },
  {
    path:AppNode.AUTHENTICATED,
    canActivate: [DashboardGuard()],
    loadChildren: () => import('../feature/dashboard').then(r => r.dashboardRoutes)
  },
  {
    path:AppNode.FALL_BACK,
    component:GlobalFallBackPageComponent
  }
];
