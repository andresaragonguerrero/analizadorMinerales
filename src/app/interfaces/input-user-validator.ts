export interface InputUserValidator {
  validateName(name: string): boolean;
  validateNacionality(nationality: string): boolean;
  validateIdentifier(identifier: string): boolean;
}
