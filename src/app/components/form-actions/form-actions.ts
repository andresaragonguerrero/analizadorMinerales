import {
  Component,
  EventEmitter,
  Output,
  effect,
  signal,
} from '@angular/core';
// interfaces
import { FormConfig } from '../../interfaces/form-config';
// servicios
import { LanguageService } from '../../services/language';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-form-actions',
  templateUrl: './form-actions.html',
  imports: [TranslateModule],
  styleUrls: ['./form-actions.css'],
})
export class FormActions implements FormConfig {
  // propiedades
  selectedDisplayMode: 'expanded' | 'collapsed' = 'expanded';
  selectedCriteria: string | null = null;
  selectedLanguage = signal<'es' | 'en' | 'fr'>('es');

  // constructor
  constructor(
    private readonly languageService: LanguageService,
    private readonly translate: TranslateService
  ) {
    effect(() => {
      const lang = this.languageService.getCurrentLanguage();
      this.selectedLanguage.set(lang);
      this.translate.use(lang);
    });
  }

  /**
   * La estrategia que voy a emplear es la siguiente:
   * como no me quiero complicar la vida (de momento),
   * voy a enviar los eventos de este componente hacia el padre,
   * el componente AppComponent se encargará entonces de pasarlos
   * a los componentes hermanos de formActionsComponent.
   * También existe otro método que sería emplear servicios
   * y que cada componente se suscribiera a uno.
   * Probablemente sea lo más astuto y escalable
   */

  @Output()
  displayModeChange = new EventEmitter<'expanded' | 'collapsed'>();

  @Output()
  criteriaChange = new EventEmitter<string | null>();

  @Output()
  formsSubmit = new EventEmitter<void>();

  @Output()
  formsReset = new EventEmitter<void>();

  @Output()
  clearStorage = new EventEmitter<void>();


  setDisplayMode(mode: 'expanded' | 'collapsed'): void {
    this.selectedDisplayMode = mode;
    this.displayModeChange.emit(mode);
  }

  setCriteria(criteria: string): void {
    this.selectedCriteria = criteria;
    this.criteriaChange.emit(criteria);
  }

  submitForms(): void {
    this.formsSubmit.emit();
  }

  resetForms(): void {
    this.selectedDisplayMode = 'expanded';
    this.selectedCriteria = null;

    this.formsReset.emit();
  }

  changeLanguage(lang: 'es' | 'en' | 'fr') {
    this.languageService.setLanguage(lang);
  }
}
