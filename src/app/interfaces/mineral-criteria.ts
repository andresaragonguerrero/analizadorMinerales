export type MineralGroup = 'igneousGroup' | 'metamorphicGroup' | 'sedimentaryGroup';

export interface MineralCriteria {
  /**
 * Los tres tipos de criterios existentes: igneos, sedimentarios y metamórficos
 */
  type: MineralGroup;
}
