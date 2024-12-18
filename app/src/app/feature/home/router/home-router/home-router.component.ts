import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-home-router',
  standalone: true,
  imports: [
    RouterOutlet, TranslateModule
  ],
  templateUrl: './home-router.component.html',
  styleUrl: './home-router.component.scss'
})
export class HomeRouterComponent {

}
