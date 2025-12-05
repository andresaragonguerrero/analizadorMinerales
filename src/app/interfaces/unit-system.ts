export interface UnitSystem {
  temperature: string;
  convertTemperature(unit: number): number;
}
