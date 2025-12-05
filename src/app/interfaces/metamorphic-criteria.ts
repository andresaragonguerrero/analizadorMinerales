import { MineralCriteria } from './mineral-criteria';
import { MineralData } from './mineral-data';

type RequirementsValidations = (mineral: MineralData) => boolean;

export interface MetamorphicCriteria extends MineralCriteria {
  /**
   * Requerimientos:
   * - El mineral es de tipo 'metamorphicGroup'
   * - El tamaño del grano es medio/fino (< 5)
   * - Textura: vítrea
   */
  requirements: RequirementsValidations[];
}
