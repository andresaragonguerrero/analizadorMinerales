import {
  Component,
  EventEmitter,
  Output,
  signal,
} from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
// servicios
import { LanguageService } from '../../services/language';
import { ThemeService } from '../../services/theme';
import { UnitSystemService } from '../../services/unit-system';

@Component({
  selector: 'app-header',
  imports: [
    CommonModule,
    FormsModule,
    TranslateModule,
  ],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  // propiedades
  selectedLanguage = signal<'es' | 'en' | 'fr'>('es');
  theme = signal<'light' | 'dark'>('light');

  // constructor
  constructor(
    private readonly languageService: LanguageService,
    private readonly themeService: ThemeService,
    private readonly unitSystemService: UnitSystemService
  ) {
    this.selectedLanguage.set(this.languageService.getCurrentLanguage());
    this.theme.set(this.themeService.getTheme());
  }

  @Output()
  languageChange = new EventEmitter<string>();

  // funciones
  setLanguage(lang: 'es' | 'en' | 'fr') {
    this.selectedLanguage.set(lang);
    this.languageService.setLanguage(lang);
    this.languageChange.emit(lang);

    if (lang === 'en') {
      this.unitSystemService.setActiveSystem('imperial');
    } else {
      this.unitSystemService.setActiveSystem('metric');
    }
  }

  get currentLanguage(): string {
    return this.selectedLanguage();
  }

  toggleTheme() {
    this.themeService.toggleTheme();
  }
}
