import { MineralCriteria } from './mineral-criteria';
import { MineralData } from './mineral-data';

type RequirementsValidations = (mineral: MineralData) => boolean;

export interface SedimentaryCriteria extends MineralCriteria {
  /**
   * Requerimientos:
   * - El mineral es de tipo 'sedimentaryGroup'
   * - Textura: fanerítica
   */
  requirements: RequirementsValidations[];
}
