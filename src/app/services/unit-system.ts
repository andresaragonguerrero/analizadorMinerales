import { Injectable } from '@angular/core';
import { UnitSystem } from '../interfaces/unit-system';

class MetricUnitSystem implements UnitSystem {
  temperature = 'º C';

  convertTemperature(unit: number): number {
    return unit;
  }
}

class ImperialUnitSystem implements UnitSystem {
  temperature = 'º F';

  convertTemperature(unit: number): number {
    return unit * 1.8 + 32;
  }
}

@Injectable({
  providedIn: 'root',
})
export class UnitSystemService {
  private activeSystem: UnitSystem = new MetricUnitSystem();

  constructor() {}

  convertTemperature(unit: number): number {
    return this.activeSystem.convertTemperature(unit);
  }

  getTemperatureSymbol(): string {
    return this.activeSystem.temperature;
  }

  setActiveSystem(system: 'metric' | 'imperial') {
    if (system === 'metric') {
      this.activeSystem = new MetricUnitSystem();
    } else {
      this.activeSystem = new ImperialUnitSystem();
    }
  }
}
