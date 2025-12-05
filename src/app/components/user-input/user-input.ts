import {
  Component,
  EventEmitter,
  Output
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
// interfaces
import { UserData } from '../../interfaces/user-data';
// servicios
import { InputUserValidatorService } from '../../services/input-user-validator';
import { TranslateModule } from '@ngx-translate/core';
@Component({
  selector: 'app-user-input',
  imports: [
    TranslateModule,
    FormsModule,
    CommonModule,
  ],
  templateUrl: './user-input.html',
  styleUrl: './user-input.css',
})
export class UserInput {
  // propiedades
  user: UserData = {
    userIdentifier: '',
    userName: '',
    userNationality: '',
    // userMission: '',
  };
  displayMode: 'expanded' | 'collapsed' = 'expanded';
  constructor(
    private readonly inputValidator: InputUserValidatorService,
  ) { }

  @Output()
  userSubmitted = new EventEmitter<any>();

  // funciones
  // FALTA POR HACER EL VALIDADOR DEL IDENTIFICADOR

  validateUserName(): boolean {
    return this.inputValidator.validateName(this.user.userName);
  }

  validateUserNationality(): boolean {
    return this.inputValidator.validateNacionality(this.user.userNationality);
  }

  // funcionalidades de la configuración
  changeDisplayMode(mode: 'expanded' | 'collapsed') {
    this.displayMode = mode;
  }

  submit() {
    const validations = [
      // this.validateUserIdentifier(),
      this.validateUserName(),
      this.validateUserNationality(),
    ];

    // verificar si todas las validaciones son verdaderas
    const allValid = validations.every(valid => valid === true);
    if (!allValid) {
      console.error('Error: hay campos inválidos. No se puede enviar el formulario.');
      return;
    }

    // verifica si el identificador del usuario ya existe (POR HACER)

    // envía el formulario
    this.userSubmitted.emit({
      ...this.user,
    } as any);
  }
  // reinicia el formulario
  reset() {
    this.user = {
      userIdentifier: '',
      userName: '',
      userNationality: '',
    };
  }
}
