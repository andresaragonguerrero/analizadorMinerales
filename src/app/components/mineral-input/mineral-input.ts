import {
  Component,
  EventEmitter,
  Output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
// interfaces
import { MineralData } from '../../interfaces/mineral-data';
import { InputMineralValidator } from '../../interfaces/input-mineral-validator';
// servicios
import { InputMineralValidatorService } from '../../services/input-mineral-validator';
import { MineralCriteriaService } from '../../services/mineral-criteria';
import { CriteriaValidatorService } from '../../services/criteria-validator';
import { MineralRepositoryService } from '../../services/mineral-repository';
import { LanguageService } from '../../services/language';
import { UnitSystemService } from '../../services/unit-system';
@Component({
  selector: 'app-mineral-input',
  imports: [
    CommonModule,
    FormsModule,
    TranslateModule,
  ],
  templateUrl: './mineral-input.html',
  styleUrl: './mineral-input.css',
})
export class MineralInput implements InputMineralValidator {
  // propiedades
  mineral: MineralData = {
    mineralIdentifier: '',
    mineralName: '',
    mineralGroup: '',
    mineralHardness: 0,
    mineralGrainSize: 0,
    mineralGrainShape: '',
    mineralCristalSize: 0,
    mineralFormationTemperature: 0,
    mineralStructure: '',
    mineralTexture: '',
    mineralClassification: '',
  };

  buildingClassification: boolean = false;
  ornamentalClassification: boolean = false;
  toolClassification: boolean = false;
  wornClassification: boolean = false;

  selectedLanguage: any;

  displayMode: 'expanded' | 'collapsed' = 'expanded';
  selectedCriteria: string | null = null;

  // constructor
  constructor(
    private readonly inputValidator: InputMineralValidatorService,
    private readonly mineralCriteriaService: MineralCriteriaService,
    private readonly criteriaValidatorService: CriteriaValidatorService,
    private readonly mineralRepositoryService: MineralRepositoryService,
    private readonly languageService: LanguageService,
    public readonly unitSystemService: UnitSystemService,
  ) {
    this.selectedLanguage = this.languageService.currentLanguage;
  }

  @Output()
  mineralSubmitted = new EventEmitter<any>();

  @Output()
  languageChange = new EventEmitter<string>();

  // funciones: validaciones de campos
  validateMineralIdentifier(): boolean {
    return this.inputValidator.validateMineralIdentifier(
      this.mineral.mineralIdentifier
    );
  }

  validateMineralName(): boolean {
    return this.inputValidator.validateMineralName(this.mineral.mineralName);
  }

  validateMineralGroup(): boolean {
    return this.inputValidator.validateMineralGroup(this.mineral.mineralGroup);
  }

  validateMineralHardness(): boolean {
    return this.inputValidator.validateMineralHardness(
      this.mineral.mineralHardness
    );
  }

  validateMineralGrainSize(): boolean {
    return this.inputValidator.validateMineralGrainSize(
      this.mineral.mineralGrainSize
    );
  }

  validateMineralGrainShape(): boolean {
    return this.inputValidator.validateMineralGrainShape(
      this.mineral.mineralGrainShape
    );
  }

  validateMineralClassification(): boolean {
    const classificationSelected =
      this.buildingClassification ||
      this.ornamentalClassification ||
      this.toolClassification ||
      this.wornClassification;

    return classificationSelected;
  }

  validateMineralCristalSize(): boolean {
    return this.inputValidator.validateMineralCristalSize(
      this.mineral.mineralCristalSize
    );
  }

  validateMineralFormationTemperature(): boolean {
    return this.inputValidator.validateMineralFormationTemperature(
      this.mineral.mineralFormationTemperature
    );
  }

  validateMineralStructure(): boolean {
    return this.inputValidator.validateMineralStructure(
      this.mineral.mineralStructure
    );
  }

  validateMineralTexture(): boolean {
    return this.inputValidator.validateMineralTexture(
      this.mineral.mineralTexture
    );
  }

  // funciones: validaciones de criterios
  getMineralCriteria() {
    const result = this.mineralCriteriaService.getMineralCriteria(
      this.mineral,
      this.mineral.mineralGroup
    );

    return this.criteriaValidatorService.setResult(result);
  }

  // funcionalidades de la configuración
  changeDisplayMode(mode: 'expanded' | 'collapsed') {
    this.displayMode = mode;
  }

  changeCriteria(criteria: string | null) {
    this.selectedCriteria = criteria;

    if (!criteria) {
      console.warn('No se ha seleccionado ningún criterio.');
      return;
    }

    const result = this.mineralCriteriaService.getMineralCriteria(
      this.mineral,
      criteria
    );

    const validated = this.criteriaValidatorService.setResult(result);
    console.log('Criterio validado:', validated);
  } //changeCriteria.end

  submit() {
    // validaciones
    const validations = [
      this.validateMineralIdentifier(),
      this.validateMineralName(),
      this.validateMineralGroup(),
      this.validateMineralHardness(),
      this.validateMineralGrainSize(),
      this.validateMineralGrainShape(),
      this.validateMineralCristalSize(),
      this.validateMineralFormationTemperature(),
      this.validateMineralStructure(),
      this.validateMineralTexture(),
      this.validateMineralClassification(),
    ];

    // verifica si todas las validaciones son verdaderas
    const allValid = validations.every(valid => valid === true);
    if (!allValid) {
      console.error('Error: hay campos inválidos. No se puede enviar el formulario.');
      return;
    }

    // verifica si el identificador del mineral ya existe
    const mineralExist = this.mineralRepositoryService.getMineral()
      .some(mineral => mineral.mineralIdentifier === this.mineral.mineralIdentifier);

    if (mineralExist) {
      alert(`El mineral con identificador ${this.mineral.mineralIdentifier} ya existe y no se guardará.`);
      return;
    }

    // si todas las validaciones son verdaderas, enviar el formulario
    this.mineralSubmitted.emit({
      ...this.mineral,
      buildingClassification: this.buildingClassification,
      ornamentalClassification: this.ornamentalClassification,
      toolClassification: this.toolClassification,
      wornClassification: this.wornClassification
    } as any);

    // si todas las validaciones son verdaderas, guardar en el localStorage
    this.mineralRepositoryService.saveMineral({
      ...this.mineral,
      buildingClassification: this.buildingClassification,
      ornamentalClassification: this.ornamentalClassification,
      toolClassification: this.toolClassification,
      wornClassification: this.wornClassification
    } as any);
  } // submit.end

  reset() {
    this.mineral = {
      mineralIdentifier: '',
      mineralName: '',
      mineralGroup: '',
      mineralHardness: 0,
      mineralGrainSize: 0,
      mineralGrainShape: '',
      mineralCristalSize: 0,
      mineralFormationTemperature: 0,
      mineralStructure: '',
      mineralTexture: '',
      mineralClassification: '',
    };

    this.buildingClassification = false;
    this.ornamentalClassification = false;
    this.toolClassification = false;
    this.wornClassification = false;
    this.displayMode = 'expanded';
  } // reset.end

  changeLanguage(lang: 'es' | 'en' | 'fr') {
    this.languageService.setLanguage(lang);
  }
}
