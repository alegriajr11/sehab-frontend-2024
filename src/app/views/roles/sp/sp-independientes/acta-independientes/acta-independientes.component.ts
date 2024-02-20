import { Component } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ActaSpIndPdfDto } from '../../../../../models/Actas/actaSpIndPdf.dto';
import { Municipio } from '../../../../../models/Prestador/municipio';
import { Usuario } from '../../../../../models/usuario';
import { PrestadorDto } from '../../../../../models/prestador.dto';
import { PrestadorService } from '../../../../../services/prestador.service';
import { MunicipioService } from '../../../../../services/NuevoPrestador/municipio.service';
import { UsuarioService } from '../../../../../services/usuario.service';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../../../../services/auth.service';
import { ActapdfService } from '../../../../../services/Sic/actapdf.service';
import { SharedServiceService } from '../../../../../services/shared-service.service';
import { GenerarPdfActaIndService } from '../../../../../services/SpInd/generar-pdf-acta-ind.service';
import { TokenService } from '../../../../../services/token.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-acta-independientes',
  templateUrl: './acta-independientes.component.html',
  styleUrl: './acta-independientes.component.scss'
})
export class ActaIndependientesComponent {


  prestador!: PrestadorDto[];
  usuario!: Usuario[];
  municipio!: Municipio[];

  //DTO DEL PDF ACTA
  actaPdf!: ActaSpIndPdfDto;


  //Habilitar la Fecha Final
  habilitarfechaFin = false;

  //Boton habilitar la evaluacion
  boton_acta_sp_ind = false;

  //MODAL
  public modalRef!: BsModalRef;

  listaVacia: any = undefined;

  //ALAMACENAR EL ID PK ACTA
  id_acta!: number

  //VARIABLES PARA TRANSPORTAR EL DTO
  act_id!: number;
  act_visita_inicial!: boolean;
  act_visita_seguimiento!: boolean;
  act_fecha_inicial!: string;
  act_fecha_final!: string;
  act_municipio!: string
  act_prestador!: string
  act_nit!: string;
  act_direccion!: string
  act_barrio!: string
  act_telefono!: string
  act_email!: string
  act_representante!: string
  act_cod_prestador!: string
  act_obj_visita: string = ''
  act_id_funcionario!: number
  act_nombre_funcionario!: string
  act_cargo_funcionario!: string
  act_firma_funcionario!: string
  act_nombre_prestador!: string
  act_cargo_prestador!: string
  act_firma_prestador!: string

  //ATRIBUTOS ID DE SELECTS
  act_municipioId!: string
  act_prestadorId!: string
  act_funcionarioId!: string

  act_recibe_visita: string = 'false';
  noFirmaActa: string = 'false';

  firma!: string;

  constructor(
    private modalService: BsModalService,
    private prestadorService: PrestadorService,
    private municipioService: MunicipioService,
    private usuarioService: UsuarioService,
    private toastrService: ToastrService,
    private authService: AuthService,
    private actaPdfService: ActapdfService,
    public sharedService: SharedServiceService,
    private generarPdfActaSpInd: GenerarPdfActaIndService,
    private tokenService: TokenService,
    private router: Router

  ) { }

  ngOnInit(): void {
    this.incializarDatos();
  }

  incializarDatos() {
    this.cargarMunicipio();
    this.cargarUsuario();

    //this.obtenerNombres();
    this.mostrarActaId();

  }

  habilitarFechaFinal() {
    this.habilitarfechaFin = true;
  }

  cargarMunicipio(): void {
    this.municipioService.lista().subscribe(
      data => {
        this.municipio = data;
        this.listaVacia = undefined;
      },
      err => {
        this.listaVacia = err.error.message;
      }
    )
    this.act_municipioId = ''
  }

  //LISTAR USUARIOS
  cargarUsuario(): void {
    const rol_sp = 'sp'
    this.usuarioService.listaUserRol(rol_sp).subscribe(
      data => {
        this.usuario = data;
        this.listaVacia = undefined;
      },
      err => {
        this.listaVacia = err.error.message;
      }
    )
    this.act_funcionarioId = ''
  }

  //LISTAR PRESTADORES POR MUNICIPIO
  cargarPrestadoresByMun(): void {
    this.prestadorService.listMun(this.act_municipioId).subscribe(
      data => {
        this.prestador = data;
        this.listaVacia = undefined
      },
      err => {
        this.listaVacia = err.error.message;
      }
    );
    this.act_prestadorId = ''
  }

  //PERMITIR SOLO SELECCIONA UN SOLO CHECKBOX
  unsoloCheckbox(checkbox: string): void {
    if (checkbox === 'inicial' && this.act_visita_inicial) {
      this.act_visita_seguimiento = false;
    } else if (checkbox === 'segumiento' && this.act_visita_seguimiento) {
      this.act_visita_inicial = false;
    }
  }

  //LISTAR ÚLTIMA ACTA REGISTRADA
  mostrarActaId(): void {
    this.actaPdfService.listaUltimaSpInd().subscribe(
      data => {
        this.actaPdf = data
        var acta = (document.getElementById('acta')) as HTMLSelectElement
        acta.value = this.actaPdf.act_id?.toString() || ''
      }
    )
  }

  //COMPLETAR INPUT_CARGO POR USUARIO SELECCIONADO
  cargoUsuario() {
    var id = (document.getElementById('usu_secretaria')) as HTMLSelectElement
    var sel = id.selectedIndex;
    var opt = id.options[sel]
    var Codigo = (<HTMLSelectElement><unknown>opt).value;

    const idUsuarioComoNumero = parseInt(Codigo, 10);
    this.usuarioService.oneUser(idUsuarioComoNumero).subscribe(
      data => {
        for (const usu of this.usuario) {
          if (usu.usu_id === idUsuarioComoNumero) {
            var cargo_usuario = (document.getElementById('cargoSecre')) as HTMLSelectElement
            cargo_usuario.value = usu.usu_cargo
            this.act_cargo_funcionario = cargo_usuario.value
          }
        }
      }
    )
  }

  //COMPLETAR CAMPOS AL SELECCIONAR EL PRESTADOR
  llenarCampos() {
    var id = (document.getElementById('prestador')) as HTMLSelectElement
    var sel = id.selectedIndex;
    var opt = id.options[sel]
    var Codigo = (<HTMLSelectElement><unknown>opt).value;


    this.prestadorService.listaOne(Codigo).subscribe(
      data => {
        for (const pres of this.prestador) {
          if (pres.pre_cod_habilitacion === Codigo) {
            var nit = (document.getElementById('nit')) as HTMLSelectElement
            nit.value = pres.pre_nit;
            var direccion = (document.getElementById('direccion')) as HTMLSelectElement
            direccion.value = pres.pre_direccion;
            var telefono = (document.getElementById('telefono')) as HTMLSelectElement
            telefono.value = pres.pre_telefono;
            var email = (document.getElementById('email')) as HTMLSelectElement
            email.value = pres.pre_email;
            var rep_legal = (document.getElementById('rep_legal')) as HTMLSelectElement
            rep_legal.value = pres.pre_representante;
            var cod_pres = (document.getElementById('codpres')) as HTMLSelectElement
            cod_pres.value = pres.pre_cod_habilitacion;
            var nombrePrestador = (document.getElementById('nombrePrestador')) as HTMLSelectElement
            nombrePrestador.value = pres.pre_representante
          }
        }
      },
      err => {
        this.listaVacia = err.error.message;
      }
    );
  }


  obtenerNombres(): void {
    //OBTENER NOMBRE DEL PRESTADOR
    const idp = document.getElementById('prestador') as HTMLSelectElement;
    const selp = idp.selectedIndex;
    const optp = idp.options[selp] as HTMLOptionElement;
    const valorPrestador = optp ? optp.textContent : '';
    sessionStorage.setItem("nombre-pres-sp-ind", valorPrestador || '');

    //CODIGO PRESTADOR
    var codigoPres = (document.getElementById('codpres')) as HTMLInputElement
    var valorCodigoPres = codigoPres.value
    sessionStorage.setItem("cod-pres-sp-ind", valorCodigoPres);

  }

  ngAfterViewInit(): void {
  }

  onRegister() {
  }
}
