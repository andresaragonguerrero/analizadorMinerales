import { Injectable } from '@angular/core';
import { InputUserValidator } from '../interfaces/input-user-validator';
@Injectable({
  providedIn: 'root',
})
export class InputUserValidatorService implements InputUserValidator {
  private readonly LETTERS_REGEX = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/;

  private validateStringOnlyLetters(value: string): boolean {
    return this.LETTERS_REGEX.test(value.trim());
  }

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
