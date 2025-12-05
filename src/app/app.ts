import {
  Component,
  signal,
  ViewChild
} from '@angular/core';

// componentes
import { MineralCriteria } from "./components/mineral-criteria/mineral-criteria";
import { MineralInput } from "./components/mineral-input/mineral-input";
import { UserInput } from "./components/user-input/user-input";
import { FormActions } from "./components/form-actions/form-actions";
import { Header } from './components/header/header';
import { SharedModule } from './shared/shared.module';

// servicios
import { LanguageService } from './services/language';
import { MineralRepositoryService } from './services/mineral-repository';

@Component({
  selector: 'app-root',
  imports: [
    UserInput,
    MineralInput,
    MineralCriteria,
    FormActions,
    Header,
    SharedModule,
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('analizadorMinerales');

  /**
   * se encargan de acceder a los componentes mineralInput y userInput,
   * para poder recibir los datos del mineral y del astronauta
   */
  @ViewChild(MineralInput) mineralInput!: MineralInput;
  @ViewChild(UserInput) userInput!: UserInput;

  @ViewChild(MineralCriteria) mineralCriteria!: MineralCriteria;

  @ViewChild(Header) header!: Header;

  // constructor
  constructor(private readonly mineralRepositoryService: MineralRepositoryService) { }

  onDisplayModeChange(mode: 'expanded' | 'collapsed'): void {
    this.mineralInput.changeDisplayMode(mode);
    this.userInput.changeDisplayMode(mode);
  }

  /**
   * en el caso de esta funcionalidad,
   * se le permite que el valor recibido sea null
   * porque habrá veces que el usuario no solicite criterios que debe pasar el mineral
   */
  onCriteriaChange(criteria: string | null): void {
    if (criteria) {
      this.mineralInput.changeCriteria(criteria);
    }
  }

  onSubmit(): void {
    if (!this.mineralInput.selectedCriteria) {
      alert('No se ha seleccionado ningun criterio.');
    }

    this.mineralInput.changeCriteria(this.mineralInput.selectedCriteria);

    this.mineralInput.submit();
    // this.userInput.submit();
  }

  onMineralSubmitted(mineralData: any): void {
    if (this.mineralCriteria) {
      this.mineralCriteria.displayMineralData(mineralData);
    }
  }

  onReset(): void {
    this.mineralInput.reset();
    this.userInput.reset();
  }

  onClearStorage(): void {
    this.mineralRepositoryService.clearMineral();
  }

}
