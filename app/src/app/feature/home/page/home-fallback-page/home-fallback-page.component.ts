import { Component } from '@angular/core';
import {RouterLink} from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-home-fallback-page',
  standalone: true,
  imports: [
    RouterLink, TranslateModule
  ],
  templateUrl: './home-fallback-page.component.html',
  styleUrl: './home-fallback-page.component.scss'
})
export class HomeFallbackPageComponent {

}
