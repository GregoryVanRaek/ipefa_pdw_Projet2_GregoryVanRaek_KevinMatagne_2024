import { Component, Input } from '@angular/core';
import { InputComponent } from '@shared/ui';
import { SimpleButtonComponent } from '@shared/ui/button/component/simple-button/simple-button.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [
    InputComponent,
    SimpleButtonComponent,
    RouterLink
  ],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent {
  @Input({required:true}) title!:string;
  @Input({required:true}) subTitle!:string;
}
