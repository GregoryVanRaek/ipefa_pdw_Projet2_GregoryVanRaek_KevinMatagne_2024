import { Component, Input } from '@angular/core';
import {RouterLink, RouterOutlet} from '@angular/router';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faArrowUpFromBracket, faChartSimple, faHouse, faUser } from '@fortawesome/free-solid-svg-icons';
import { SecurityService } from '../../../security';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-dashboard-router',
  standalone: true,
  imports: [
    RouterOutlet,
    FaIconComponent,
    RouterLink,
    TranslateModule
  ],
  templateUrl: './dashboard-router.component.html',
  styleUrl: './dashboard-router.component.scss'
})
export class DashboardRouterComponent {
  constructor(public securityService :SecurityService) {
  }

  protected readonly faUser = faUser;
  protected readonly faChartSimple = faChartSimple;
  protected readonly faHouse = faHouse;
  protected readonly faArrowUpFromBracket = faArrowUpFromBracket;

  username:string = "Demo";
  state:string = "Student";


  logout():void{
    return this.securityService.logOut();
  }

}
