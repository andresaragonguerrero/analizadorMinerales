import {
  Component,
  ElementRef,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
// componentes

// servicios
import { CriteriaValidatorService } from './../../services/criteria-validator';
import { TranslateModule } from '@ngx-translate/core';
import { MineralStorage } from '../mineral-storage/mineral-storage';

@Component({
  selector: 'app-mineral-criteria',
  imports: [
    CommonModule,
    TranslateModule,
    MineralStorage,
  ],
  templateUrl: './mineral-criteria.html',
  styleUrl: './mineral-criteria.css',
})
export class MineralCriteria {
  // permite acceder al elemento del DOM: errorList
  @ViewChild('errorList', { static: false }) errorList!: ElementRef;

  // propiedades
  validationResult: any = null;

  // constructor
  constructor(
    private readonly criteriaValidatorService: CriteriaValidatorService,
  ) {
    this.criteriaValidatorService.currentResult$.subscribe((result) => {
      this.validationResult = result;
      this.showErrorList();
    });
  }

  // funciones
  showErrorList() {
    if (!this.validationResult || !this.errorList) return;

    const container = this.errorList.nativeElement as HTMLElement;
    container.innerHTML = '';

    if (!this.validationResult.criteriaIsValid) {
      this.validationResult.errorMessage.forEach((error: string) => {
        const li = document.createElement('li');
        const em = document.createElement('em');
        em.textContent = error;
        li.appendChild(em);
        container.appendChild(li);
      });
    }
  }

  displayMineralData(mineralData: any) {
    this.validationResult = {
      criteriaIsValid: true,
      errorMessage: [],
      mineralData: {
        ...mineralData,
        buildingClassification: mineralData.buildingClassification || false,
        ornamentalClassification: mineralData.ornamentalClassification || false,
        toolClassification: mineralData.toolClassification || false,
        wornClassification: mineralData.wornClassification || false
      }
    };

    this.showErrorList();
  }
}
