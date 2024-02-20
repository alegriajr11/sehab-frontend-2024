import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PamecRoutingModule } from './pamec-routing.module';
import { ModalCalificacionPamecComponent } from './evaluacion-pamec/modal-calificacion-pamec/modal-calificacion-pamec.component';


@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    PamecRoutingModule
  ]
})
export class PamecModule { }
