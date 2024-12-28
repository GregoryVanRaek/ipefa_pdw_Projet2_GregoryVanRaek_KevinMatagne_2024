import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {TranslatePipe} from '@ngx-translate/core';

@Component({
  selector: 'app-security-router',
  standalone: true,
  imports: [
    RouterOutlet,
    TranslatePipe
  ],
  templateUrl: './security-router.component.html',
  styleUrl: './security-router.component.scss'
})
export class SecurityRouterComponent {
}
