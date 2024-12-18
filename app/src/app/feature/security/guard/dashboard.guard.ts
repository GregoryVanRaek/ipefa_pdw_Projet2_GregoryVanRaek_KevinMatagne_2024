import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { SecurityService } from '../service';

export function DashboardGuard(isPublic :Boolean = false, redirectRoute: string = ''): CanActivateFn {
  return () => {
    const securityService :SecurityService = inject(SecurityService);
    const canAccess: boolean = securityService.isAuthenticated$();
    const router: Router = inject(Router);

    if(isPublic){
      return !canAccess || router.createUrlTree([redirectRoute])
    }

    return canAccess || router.createUrlTree([redirectRoute]);
  };
}
