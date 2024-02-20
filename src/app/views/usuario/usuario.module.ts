import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsuarioRoutingModule } from './usuario-routing.module';
import { GridModule } from '@coreui/angular';
import { ModalFirmaRolComponent } from './nuevo-usuario/nuevo-usuario-rol/modal-firma-rol/modal-firma-rol.component';
import { ReestablecerPasswordComponent } from './reestablecer-password/reestablecer-password.component';


@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    UsuarioRoutingModule,
    GridModule
  ]
})
export class UsuarioModule { }
