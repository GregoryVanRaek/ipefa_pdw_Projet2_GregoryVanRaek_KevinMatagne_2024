import {Component, inject} from '@angular/core';
import {RouterLink, RouterOutlet} from '@angular/router';
import {TranslateModule} from '@ngx-translate/core';
import {SecurityService} from '../../security';
import {Sidebar} from 'primeng/sidebar';

@Component({
  selector: 'app-router-page',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    TranslateModule,
    Sidebar,
  ],
  templateUrl: './router-page.component.html',
  styleUrl: './router-page.component.css'
})
export class RouterPageComponent {
  menuVisible: boolean = false;

  // DI
  securityService :SecurityService = inject(SecurityService)

  toggleMenu(): void {
    this.menuVisible = !this.menuVisible;
  }

  logout():void{
    return this.securityService.logOut();
  }

}
