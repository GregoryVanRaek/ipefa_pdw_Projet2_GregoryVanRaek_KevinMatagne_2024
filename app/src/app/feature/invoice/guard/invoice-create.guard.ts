import {CanComponentDeactivate} from '@shared/core';
import {Injectable} from '@angular/core';
import {CanDeactivate} from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class invoiceCreateGuard implements CanDeactivate<CanComponentDeactivate> {
  canDeactivate(
    component: CanComponentDeactivate
  ): boolean | Promise<boolean> {
    return component.canDeactivate ? component.canDeactivate() : true;
  }
}
