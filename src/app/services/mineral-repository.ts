import { Injectable } from '@angular/core';
import { MineralRepository } from '../interfaces/mineral-repository';
import { MineralData } from '../interfaces/mineral-data';

/**
 * Para poder comunicarme con el componente mineral-storage,
 * esta vez voy a emplear observadores
 * y obligar a que el componente se suscriba a este servicio
 */
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MineralRepositoryService implements MineralRepository {
  private readonly storageKey = 'minerals';

  private mineralsSubject = new BehaviorSubject<MineralData[]>(this.getMineral()); // (línea nueva)

  minerals$ = this.mineralsSubject.asObservable();

  saveMineral(mineral: MineralData): void {
    const minerals = this.getMineral();

    const exists = minerals.some(m => m.mineralIdentifier === mineral.mineralIdentifier);
    if (exists) {
      alert(`El mineral con identificador ${mineral.mineralIdentifier} ya existe y no se guardará.`);
      return;
    }

    minerals.push(mineral);
    localStorage.setItem(this.storageKey, JSON.stringify(minerals));

    // se encarga de actualizar el observable para avisar a los suscriptores (los componentes que empleen este servicio)
    this.mineralsSubject.next(minerals);
  } // saveMineral.end

  // devuleve TODOS los minerales
  getMineral(): MineralData[] {
    const stored = localStorage.getItem(this.storageKey);
    if (!stored) return [];
    try {
      return JSON.parse(stored) as MineralData[];
    } catch {
      console.warn('Error al parsear minerales desde localStorage');
      return [];
    }
  }

  // borra TODOS los minerales
  clearMineral(): void {
    localStorage.removeItem(this.storageKey);

    // avisa a los componentes suscritos que la lista de minerales ha cambiado a vacía
    this.mineralsSubject.next([]);
  }
}
