import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SicRoutingModule } from './sic-routing.module';
import { CardModule, GridModule, NavModule, UtilitiesModule } from '@coreui/angular';
import { IconModule } from '@coreui/icons-angular';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { NgxPaginationModule } from 'ngx-pagination';
import { BsModalService } from 'ngx-bootstrap/modal';
import { ActapdfService } from '../../../services/Sic/actapdf.service';
import { TokenService } from '../../../services/token.service';
import { SharedServiceService } from '../../../services/shared-service.service';
import { PrestadorService } from '../../../services/prestador.service';
import { MunicipioService } from '../../../services/NuevoPrestador/municipio.service';
import { UsuarioService } from '../../../services/usuario.service';
import { AuthService } from '../../../services/auth.service';
import { GenerarPdfActaService } from '../../../services/Sic/generar-pdf-acta.service';
import { SedesPrestadorService } from '../../../services/sedes-prestador.service';
import { CumplimientoEstandarService } from '../../../services/Sic/cumplimiento-estandar.service';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    SicRoutingModule,
    CardModule,
    GridModule,
    UtilitiesModule,
    IconModule,
    NavModule,
    HttpClientModule,
    NgxPaginationModule,
    FormsModule,
    ToastrModule.forRoot()
  ],
  providers: [
    BsModalService,
    ActapdfService,
    TokenService,
    SharedServiceService,
    PrestadorService,
    MunicipioService,
    UsuarioService,
    ToastrService,
    AuthService,
    GenerarPdfActaService,
    SedesPrestadorService,
    CumplimientoEstandarService
  ]
})
export class SicModule { }
