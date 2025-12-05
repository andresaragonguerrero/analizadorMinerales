import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

// Componentes standalone
import { FormActions } from '../components/form-actions/form-actions';
import { Header } from '../components/header/header';
import { MineralInput } from '../components/mineral-input/mineral-input';
import { MineralCriteria } from '../components/mineral-criteria/mineral-criteria';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    FormActions,
    Header,
    MineralInput,
    MineralCriteria
  ],
  exports: [
    FormActions,
    Header,
    MineralInput,
    MineralCriteria
  ]
})
export class SharedModule { }