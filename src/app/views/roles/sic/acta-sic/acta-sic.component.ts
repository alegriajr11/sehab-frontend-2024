import { Component, Inject, Renderer2, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ActaSicPdfDto } from '../../../../models/Actas/actaSicpdf.dto';
import { SedesDto } from '../../../../models/sedes.dto';
import { Municipio } from '../../../../models/Prestador/municipio';
import { Usuario } from '../../../../models/usuario';
import { PrestadorDto } from '../../../../models/prestador.dto';
import { DOCUMENT } from '@angular/common';
import { PrestadorService } from '../../../../services/prestador.service';
import { MunicipioService } from '../../../../services/NuevoPrestador/municipio.service';
import { UsuarioService } from '../../../../services/usuario.service';
import { ActapdfService } from '../../../../services/Sic/actapdf.service';
import { SharedServiceService } from '../../../../services/shared-service.service';
import { TokenService } from '../../../../services/token.service';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../../../services/auth.service';
import { GenerarPdfActaService } from '../../../../services/Sic/generar-pdf-acta.service';
import { SedesPrestadorService } from '../../../../services/sedes-prestador.service';
import { CumplimientoEstandarService } from '../../../../services/Sic/cumplimiento-estandar.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-acta-sic',
  templateUrl: './acta-sic.component.html',
  styleUrl: './acta-sic.component.scss'
})
export class ActaSicComponent {



  prestador!: PrestadorDto[];
  usuario!: Usuario[];
  municipio!: Municipio[];
  sede!: SedesDto[];

  //DTO DEL PDF ACTA
  actaPdf!: ActaSicPdfDto;

  //Habilitar la Fecha Final
  habilitarfechaFin = false;

  //Habilitar Select Sede Principal
  habilitarSelectSede: boolean = false;

  listaVacia: any = undefined;

  //MODAL
  public modalRef!: BsModalRef;



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
  act_sede_principal!: string
  act_sede_localidad!: string
  act_sede_direccion!: string
  act_representante!: string
  act_cod_prestador!: string
  act_cod_sede!: string
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
  act_sede_principalId!: string

  act_recibe_visita: string = 'true';
  noFirmaActa: string = 'false';

  estado_recibe_visita!: string

  //ID DE EVALUACION
  eva_id!: number

  firma!: string;


  constructor(
    @Inject(DOCUMENT) private document: Document,
    private renderer: Renderer2,

    //SERVICIOS
    private modalService: BsModalService,
    private prestadorService: PrestadorService,
    private municipioService: MunicipioService,
    private usuarioService: UsuarioService,
    private actaPdfService: ActapdfService,
    public sharedService: SharedServiceService,
    private tokenService: TokenService,
    private toastrService: ToastrService,
    private authService: AuthService,
    private generarPdfActaSic: GenerarPdfActaService,
    private sedesServices: SedesPrestadorService,
    private cumplimientoEstandarService: CumplimientoEstandarService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.incializarDatos();
  }

  incializarDatos() {
    this.cargarMunicipio();
    this.cargarUsuario();
    //this.unsoloCheckbox();
    //this.obtenerNombres();
    this.ultimaActaId();
  }

  habilitarFechaFinal() {
    this.habilitarfechaFin = true;
  }

  habilitarSede() {
    this.habilitarSelectSede = true;
  }



  //Metodo Abrir Modal
  openModal(modalTemplate: TemplateRef<any>) {
    this.modalRef = this.modalService.show(modalTemplate,
      {
        class: 'modal-dialogue-centered modal-md',
        backdrop: true,
        keyboard: true
      }

    );
  }

  //LISTAR MUNICIPIOS
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

  //LISTAR USUARIOS
  cargarUsuario(): void {
    const rol_sic = 'sic'
    this.usuarioService.listaUserRol(rol_sic).subscribe(
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


  //PERMITIR SOLO SELECCIONA UN SOLO CHECKBOX
  unsoloCheckbox(checkbox: string): void {
    if (checkbox === 'inicial' && this.act_visita_inicial) {
      this.act_visita_seguimiento = false;
    } else if (checkbox === 'segumiento' && this.act_visita_seguimiento) {
      this.act_visita_inicial = false;
    }
  }


  //OBTENER LOCALIDAD Y DIRECCION DE LA SEDE SELECCIONADA
  sedeSeleccionada() {
    this.sedesServices.listaOneSede(this.act_sede_principalId).subscribe(
      data => {
        const barrio = data.sede_barrio
        const direccion = data.sede_direccion
        const numero_sede = data.sede_numero

        var sede_barrio = (document.getElementById('barrioSede')) as HTMLSelectElement
        sede_barrio.value = barrio

        var sede_direccion = (document.getElementById('direccionSede')) as HTMLSelectElement
        sede_direccion.value = direccion

        var codigo_sede = (document.getElementById('codsede')) as HTMLSelectElement
        codigo_sede.value = this.act_prestadorId + '-0' + numero_sede
      }
    )
  }

  //LISTAR ÚLTIMA ACTA REGISTRADA
  ultimaActaId(): void {
    this.actaPdfService.obtenerUltimaActaSic().subscribe(
      data => {
        this.actaPdf = data
        var acta = (document.getElementById('acta')) as HTMLSelectElement
        acta.value = this.actaPdf?.act_id?.toString() || ''
      }
    )
  }

  recibeVisita(): void {
    Swal.fire({
      title: '¿Estás seguro que el prestador no recibe la visita?',
      text: '',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.value) {
        this.act_recibe_visita = 'false'
        Swal.fire(
          'Prestador No Recibe Visita',
          '',
          'success'
        );
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelado',
          '',
          'error'
        );
      }
    });
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



  //LISTAR SEDES POR SELECCION DE PRESTADOR
  cargarSedesByPrestador() {
    this.sedesServices.listaSedesNombre(this.act_prestadorId).subscribe(
      async data => {
        this.sede = data
        for (const pres of this.prestador) {
          if (pres.pre_cod_habilitacion === this.act_prestadorId) {
            for (const pres_barrio of data) {
              //ENCONTRAR EL PRESTADOR SELECCIONADO Y ASIGNAR EL BARRIO QUE SE ENCUENTRA EN LA ENTIDAD SEDE DE LA BD
              const idPrestadorSeleccionado = this.act_prestadorId;
              const pres = await this.prestadorService.listaOne(idPrestadorSeleccionado).toPromise();
              this.act_prestador = pres.pre_nombre
              if (this.act_prestador === pres_barrio.sede_nombre) {
                var barrio_prestador_asignado = pres_barrio.sede_barrio
                var barrio_prestador = (document.getElementById('barrio')) as HTMLSelectElement
                barrio_prestador.value = barrio_prestador_asignado
              }

            }
          }
        }
        this.listaVacia = undefined
      },
      err => {
        this.listaVacia = err.error.message;
        this.act_sede_principalId = '';
        // Eliminar todas las opciones del select
        this.sede = [];
      }
    );
    //ASIGANAR LOS INPUT BARRIO, DIRECCION Y CODIGO_SEDE EN VACIO - SI SE SELECCIONA OTRO PRESTADOR
    //BARRIO DE LA SEDE
    var sede_barrio = (document.getElementById('barrioSede')) as HTMLSelectElement
    sede_barrio.value = ''
    //DIRECCIÓN DE LA SEDE
    var sede_direccion = (document.getElementById('direccionSede')) as HTMLSelectElement
    sede_direccion.value = ''
    //CODIGO DE SEDE
    var codigo_sede = (document.getElementById('codsede')) as HTMLSelectElement
    codigo_sede.value = ''

  }


  //LLENAR LOS INPUTS UNA VES SE HAYA SELECCIONADO EL PRESTADOR
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
            var rep_legal = (document.getElementById('repleg')) as HTMLSelectElement
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


  //OBTENER LOS NOMBRES DEL PRESTADOR Y FUNCIONARIO - GUARDA TEMPORALMENTE EN STORAGE
  obtenerNombres(): void {
    //OBTENER NOMBRE DEL PRESTADOR
    const idp = document.getElementById('prestador') as HTMLSelectElement;
    const selp = idp.selectedIndex;
    const optp = idp.options[selp] as HTMLOptionElement;
    const valorPrestador = optp ? optp.textContent : '';
    sessionStorage.setItem("nombre-pres-sic", valorPrestador ?? '');

    //CODIGO PRESTADOR
    var codigoPres = (document.getElementById('codpres')) as HTMLInputElement
    var valorCodigoPres = codigoPres.value
    sessionStorage.setItem("cod-pres-sic", valorCodigoPres);

    // USUARIO SECRETARIA
    const idUsuSecre = document.getElementById('usu_secretaria') as HTMLSelectElement;
    const selUsuSecre = idUsuSecre.selectedIndex;
    const optUsuSecre = idUsuSecre.options[selUsuSecre] as HTMLOptionElement;
    const valorUsuSecre = optUsuSecre ? optUsuSecre.textContent : '';
    sessionStorage.setItem("nombre-usuario-sic", valorUsuSecre ?? '');

    //CARGO USUARIO SECRETARIA
    var cargoSecre = (document.getElementById('cargoSecre')) as HTMLInputElement
    var valorCargoSecre = cargoSecre.value
    sessionStorage.setItem("cargo-usuario-sic", valorCargoSecre);

    //CARGO PRESTADOR
    var cargoPres = (document.getElementById('cargoPres')) as HTMLInputElement
    var valorCargoPres = cargoPres.value
    sessionStorage.setItem("cargo-prestador-sic", valorCargoPres);
  }

  ngAfterViewInit(): void {
  }

  onRegister() {
  }

}
