import { MineralData } from "./mineral-data";

export interface MineralRepository {
    saveMineral(mineral: MineralData): void;
    getMineral(): MineralData[]; // devuleve TODOS los minerales
    clearMineral(): void;// borra TODOS los minerales
}
