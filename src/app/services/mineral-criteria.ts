import { Injectable } from '@angular/core';
// interfaces
// hay que mejorar esto: import { MineralCriteria } from '../interfaces/mineral-criteria';
import { IgneousCriteria } from '../interfaces/igneous-criteria';
import { MetamorphicCriteria } from '../interfaces/metamorphic-criteria';
import { SedimentaryCriteria } from '../interfaces/sedimentary-criteria';
import { CriteriaMessage } from '../interfaces/criteria-message';
import { MineralData } from '../interfaces/mineral-data';

@Injectable({
  providedIn: 'root',
})
export class MineralCriteriaService {
  private readonly igneousCriteria: IgneousCriteria = {
    type: 'igneousGroup',
    requirements: [
      (mineral) => mineral.mineralGroup === 'igneousGroup',
      (mineral) => mineral.mineralGrainSize > 30,
    ],
  };

  private readonly metamorphicCriteria: MetamorphicCriteria = {
    type: 'metamorphicGroup',
    requirements: [
      (mineral) => mineral.mineralGroup === 'metamorphicGroup',
      (mineral) => mineral.mineralGrainSize < 5,
      (mineral) => mineral.mineralTexture === 'vitreousTexture',
    ],
  };

  private readonly sedimentaryCriteria: SedimentaryCriteria = {
    type: 'sedimentaryGroup',
    requirements: [
      (mineral) => mineral.mineralGroup === 'sedimentaryGroup',
      (mineral) => mineral.mineralTexture === 'faneritaTexture',
    ],
  };

  getMineralCriteria(mineral: MineralData, type: string): CriteriaMessage {
    let criteria;

    switch (type) {
      case 'igneousGroup':
        criteria = this.igneousCriteria;
        break;
      case 'metamorphicGroup':
        criteria = this.metamorphicCriteria;
        break;
      case 'sedimentaryGroup':
        criteria = this.sedimentaryCriteria;
        break;
      default:
        return {
          criteriaIsValid: false,
          errorMessage: ['El mineral no cumple con ninguno de los criterios'],
          mineralData: mineral,
        };
    }// switch.end

    const failed = criteria.requirements
      .map((fn, idx) => (!fn(mineral) ? `Requisito ${idx + 1}` : null))
      .filter(Boolean) as string[];

    return {
      criteriaIsValid: failed.length === 0,
      errorMessage: failed,
      mineralData: mineral,
    };
  } // getMineralCriteria.end
} // class.end
