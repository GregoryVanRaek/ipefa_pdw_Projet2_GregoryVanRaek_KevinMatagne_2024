import {Component, inject} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import {Language} from '@shared/core';
import {ToastModule} from 'primeng/toast';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ToastModule],
  templateUrl: './app.component.html',
  standalone: true,
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'app';
  translate = inject(TranslateService);

  ngOnInit(): void {
    this.translate.setDefaultLang(Language.EN);
    this.translate.use(Language.EN);
  }

  changeLanguage(language: string): void {
    this.translate.use(language);
  }
}
