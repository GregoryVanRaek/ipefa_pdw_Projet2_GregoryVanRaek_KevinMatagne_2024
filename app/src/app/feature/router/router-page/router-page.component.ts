import { Component } from '@angular/core';
import {RouterLink, RouterOutlet} from '@angular/router';
import {TranslateModule} from '@ngx-translate/core';
import {SecurityService} from '../../security';

@Component({
  selector: 'app-router-page',
  standalone: true,
  imports: [
    RouterOutlet,
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

  logout():void{
    return this.securityService.logOut();
  }

}
