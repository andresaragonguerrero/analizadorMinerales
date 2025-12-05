import { MineralCriteria } from './mineral-criteria';
import { MineralData } from './mineral-data';

type RequirementsValidations = (mineral: MineralData) => boolean;

export interface IgneousCriteria extends MineralCriteria {
  /**
   * Requerimientos:
   * - El mineral es de tipo 'igneousGroup'
   * - El grano es muy grueso (> 30)
   */
  requirements: RequirementsValidations[];
}
