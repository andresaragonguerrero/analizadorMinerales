import { Injectable } from '@angular/core';

// HAY QUE INCLUIR MENSAJES DE ERRORES
// Y AÑADIR LA VALIDACIÓN DEL ÚLTIMO INPUT (IDENTIFICADOR DE USUARIO PARA QUE PERMITA TAMBIÉN NÚMEROS)

export type MineralGroup = 'igneousGroup' | 'metamorphicGroup' | 'sedimentaryGroup';
export type MineralTexture = 'vitreousTexture' | 'afanitaTexture' | 'faneritaTexture';

@Injectable({
  providedIn: 'root',
})
export class InputValidatorService {

  private readonly LETTERS_REGEX = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/;
  private readonly MINERAL_HARDNESS = { min: 1, max: 10 };
  private readonly MINERAL_GRAIN_SIZE = { min: 1, max: 30 };
  private readonly MINERAL_CRISTAL_SIZE = { min: 1, max: 10 };
  private readonly FORMATION_TEMP = { min: -100, max: 100 };

  private readonly VALID_MINERAL_GROUPS: MineralGroup[] = [
    'igneousGroup',
    'metamorphicGroup',
    'sedimentaryGroup',
  ];

  private readonly VALID_TEXTURES: MineralTexture[] = [
    'vitreousTexture',
    'afanitaTexture',
    'faneritaTexture',
  ];

  // funciones privadas
  private validateStringOnlyLetters(value: string): boolean {
    return this.LETTERS_REGEX.test(value.trim());
  }

  private validateNumberRange(value: number, min: number, max: number): boolean {
    return value >= min && value <= max;
  }

  // funciones publicas
  validateMineralIdentifier(identifier: string): boolean {
    return /^[A-Za-z]{2}\d{4}[A-Za-z]{2}$/.test(identifier);
  }

  validateMineralName(name: string): boolean {
    return this.validateStringOnlyLetters(name);
  }

  validateMineralGroup(group: string): boolean {
    return this.VALID_MINERAL_GROUPS.includes(group as MineralGroup);
  }

  validateMineralHardness(hardness: number): boolean {
    return this.validateNumberRange(
      hardness,
      this.MINERAL_HARDNESS.min,
      this.MINERAL_HARDNESS.max
    );
  }

  validateMineralGrainSize(size: number): boolean {
    return this.validateNumberRange(
      size,
      this.MINERAL_GRAIN_SIZE.min,
      this.MINERAL_GRAIN_SIZE.max
    );
  }

  validateMineralGrainShape(shape: string): boolean {
    return this.validateStringOnlyLetters(shape);
  }

  validateMineralClassification(classification: string): boolean {
    const validValues = [
      'buildingClassification',
      'ornamentalClassification',
      'toolClassification',
      'wornClassification',
    ];

    return validValues.includes(classification);
  }

  validateMineralCristalSize(size: number): boolean {
    return this.validateNumberRange(
      size,
      this.MINERAL_CRISTAL_SIZE.min,
      this.MINERAL_CRISTAL_SIZE.max
    );
  }

  validateMineralFormationTemperature(temp: number): boolean {
    return this.validateNumberRange(
      temp,
      this.FORMATION_TEMP.min,
      this.FORMATION_TEMP.max
    );
  }

  validateMineralStructure(structure: string): boolean {
    return this.validateStringOnlyLetters(structure);
  }

  validateMineralTexture(texture: string): boolean {
    return this.VALID_TEXTURES.includes(texture as MineralTexture);
  }

  // USUARIO
  validateName(name: string): boolean {
    return this.validateStringOnlyLetters(name);
  }

  validateNacionality(nationality: string): boolean {
    return this.validateStringOnlyLetters(nationality);
  }

  validateIdentifier(identifier: string): boolean {
    return true;
  }
}
