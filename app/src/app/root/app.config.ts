import {ApplicationConfig, importProvidersFrom, provideZoneChangeDetection} from '@angular/core';
import {provideRouter, withComponentInputBinding} from '@angular/router';
import { routes } from './app.routes';
import {providePrimeNG} from 'primeng/config';
import {provideAnimationsAsync} from '@angular/platform-browser/animations/async';
import Aura from '@primeng/themes/aura';
import {
  HTTP_INTERCEPTORS,
  HttpClient,
  HttpClientModule,
  provideHttpClient,
  withInterceptors
} from '@angular/common/http';
import {TranslateCompiler, TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {createTranslateLoader} from './app.translation';
import { TranslateMessageFormatCompiler } from 'ngx-translate-messageformat-compiler';
import {httpInterceptor} from '@shared/api';
import {ConfirmationService, MessageService} from 'primeng/api';


export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes, withComponentInputBinding()),
    provideAnimationsAsync(),
    providePrimeNG({
      theme: {
        preset: Aura
      }
    }),
    importProvidersFrom(
      HttpClientModule,
      TranslateModule.forRoot({
        loader: {
          provide: TranslateLoader,
          useFactory: createTranslateLoader,
          deps: [HttpClient]
        }, compiler: {
          provide: TranslateCompiler,
          useClass: TranslateMessageFormatCompiler
        }
      })
    ),
    provideHttpClient(
      withInterceptors([httpInterceptor])
    ),
    MessageService,
    ConfirmationService
  ]
};
