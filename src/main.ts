import { provideHttpClient } from '@angular/common/http';

import { bootstrapApplication } from '@angular/platform-browser';
import { importProvidersFrom } from '@angular/core';
import { registerLocaleData } from '@angular/common';

import localeEs from '@angular/common/locales/es';
import localeEn from '@angular/common/locales/en';
import localeFr from '@angular/common/locales/fr';

import { TranslateModule } from '@ngx-translate/core';

import { App } from './app/app';
import { LanguageService } from './app/services/language';

registerLocaleData(localeEs);
registerLocaleData(localeEn);
registerLocaleData(localeFr);

bootstrapApplication(App, {
  providers: [
    provideHttpClient(),
    importProvidersFrom(
      TranslateModule.forRoot({
        defaultLanguage: 'es',
      })
    ),
    LanguageService
  ]
}).catch((err) => console.error(err));
