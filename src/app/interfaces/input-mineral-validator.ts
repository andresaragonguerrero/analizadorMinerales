export interface InputMineralValidator {
    validateMineralIdentifier(mineralIdentifier: string): boolean;
    validateMineralName(mineralName: string): boolean;
    validateMineralGroup(mineralGroup: string): boolean;
    validateMineralHardness(mineralHardness: number): boolean;
    validateMineralGrainSize(mineralGrainSize: number): boolean;
    validateMineralGrainShape(mineralGrainShape: string): boolean;
    validateMineralClassification(mineralClassification: string): boolean;
    validateMineralCristalSize(mineralCristalSize: number): boolean;
    validateMineralFormationTemperature(mineralFormationTemperature: number): boolean;
    validateMineralStructure(mineralStructure: string): boolean;
    validateMineralTexture(mineralTexture: string): boolean;
}
