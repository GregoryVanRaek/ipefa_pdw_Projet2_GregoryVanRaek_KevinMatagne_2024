import { Component } from '@angular/core';
import {RouterLink, RouterOutlet} from '@angular/router';
import {FaIconComponent} from '@fortawesome/angular-fontawesome';
import {TranslateModule} from '@ngx-translate/core';
import { faArrowUpFromBracket, faChartSimple, faHouse, faUser, faUsers, faBars } from '@fortawesome/free-solid-svg-icons';
import {SecurityService} from '../../security';

@Component({
  selector: 'app-router-page',
  standalone: true,
  imports: [
    RouterOutlet,
    FaIconComponent,
    RouterLink,
    TranslateModule,
  ],
  templateUrl: './router-page.component.html',
  styleUrl: './router-page.component.css'
})
export class RouterPageComponent {
  constructor(public securityService :SecurityService) {
  }

  //TODO: responsive design

  protected readonly faUser = faUser;
  protected readonly faChartSimple = faChartSimple;
  protected readonly faHouse = faHouse;
  protected readonly faArrowUpFromBracket = faArrowUpFromBracket;
  protected readonly faUsers = faUsers;
  protected readonly faBars = faBars;

  username:string = "Demo";
  state:string = "Student";

  logout():void{
    return this.securityService.logOut();
  }

}
