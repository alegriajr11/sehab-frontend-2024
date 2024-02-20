import { Component, ElementRef, TemplateRef, ViewChild } from '@angular/core';
import { PrestadorDto } from '../../../../../models/prestador.dto';
import { Usuario } from '../../../../../models/usuario';
import { Municipio } from '../../../../../models/Prestador/municipio';
import { ActaSpPdfDto } from '../../../../../models/Actas/actaSpPdf.dto';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { PrestadorService } from '../../../../../services/prestador.service';
import { MunicipioService } from '../../../../../services/NuevoPrestador/municipio.service';
import { UsuarioService } from '../../../../../services/usuario.service';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../../../../services/auth.service';
import { ActapdfService } from '../../../../../services/Sic/actapdf.service';
import { SharedServiceService } from '../../../../../services/shared-service.service';
import { GenerarPdfActaIpsService } from '../../../../../services/SpIps/generar-pdf-acta-ips.service';
import { TokenService } from '../../../../../services/token.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-acta-ips',
  templateUrl: './acta-ips.component.html',
  styleUrl: './acta-ips.component.scss'
})
export class ActaIpsComponent {



  @ViewChild('richTextEditor', { static: true }) richTextEditor!: ElementRef;

  private imagenSeleccionada: File | null = null;

  verificarImagenSeleccionada: boolean = false

  prestador!: PrestadorDto[];
  usuario!: Usuario[];
  municipio!: Municipio[];

  //DTO DEL PDF ACTA
  actaPdf!: ActaSpPdfDto;


  //Habilitar la Fecha Final
  habilitarfechaFin = false;

  //Boton habilitar la evaluacion
  boton_acta_sp_ind = false;

  //MODAL
  public modalRef!: BsModalRef;

  listaVacia: any = undefined;

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

  act_nombre_prestador_acompanante!: string
  act_cargo_prestador_acompanante!: string
  act_firma_prestador_acompanante!: string

  //ATRIBUTOS ID DE SELECTS
  act_municipioId!: string
  act_prestadorId!: string
  act_funcionarioId!: string

  //VARIABLES PARA ORDEN DEL DÍA
  act_fecha_orden!: string
  act_hora_orden24!: string //Variable almacenar hora 24H
  act_hora_orden!: string //Variable alamcenar hora en formato 12 horas
  act_num_oficio: string = 'OFICIO-SOGC-SSD-N°'
  act_fecha_oficio!: string
  act_fecha_envio_oficio!: string

  //VARIABLE PARA CAPTURA DE REPS
  imagenCargada = false;
  act_captura_imagen!: string
  firma!: string;

  //VARIABLES COMPROMISOS
  act_compromiso_actividad!: string
  act_compromiso_fecha!: string
  act_compromiso_responsable!: string


  act_recibe_visita: string = 'false';
  noFirmaActa: string = 'false';


  constructor(
    private modalService: BsModalService,
    private prestadorService: PrestadorService,
    private municipioService: MunicipioService,
    private usuarioService: UsuarioService,
    private toastrService: ToastrService,
    private authService: AuthService,
    private actaPdfService: ActapdfService,
    public sharedService: SharedServiceService,
    private generarPdfActaSpIps: GenerarPdfActaIpsService,
    private tokenService: TokenService,
    private router: Router

  ) { }

  ngOnInit(): void {
    this.inicializarDatos();
  }



  inicializarDatos() {
    this.cargarMunicipio();
    this.cargarUsuario();
    this.obtenerNombres();
    this.mostrarActaId();
  }

  habilitarFechaFinal() {
    this.habilitarfechaFin = true;
    this.act_fecha_orden = this.act_fecha_inicial
  }


  evaluacionesSeleccionadas: { [key: string]: number } = {}; // Usamos un objeto para almacenar los IDs de las evaluaciones

  toggleEvaluacion(evaKey: string, evaId: number): void {
    if (this.evaluacionesSeleccionadas[evaKey]) {
      console.log(evaId)
      // Si el checkbox se desmarca, eliminamos el ID del rol
      delete this.evaluacionesSeleccionadas[evaKey];
    } else {
      // Si el checkbox se marca, almacenamos el ID del rol
      this.evaluacionesSeleccionadas[evaKey] = evaId;
    }
  }


  mostrarToastrImg() {
    this.toastrService.success('Captura cargada exitosamente', 'Éxito', {
      timeOut: 3000,
      positionClass: 'toast-top-center',
    });
    this.modalRef?.hide();
  }


  //METODO PARA CAPTURAR SERVICIOS DEL REPS
  cargarImagen(event: any) {
    const imagen = event.target.files[0];
    if (imagen) {
      // Verificar el tamaño de la imagen (2MB = 2 * 1024 * 1024 bytes)
      if (imagen.size <= 2 * 1024 * 1024) {
        const labelElement = document.querySelector('.custom-file-label');
        if (labelElement) {
          labelElement.textContent = imagen.name;
        }

        // Almacenar la imagen seleccionada
        this.imagenSeleccionada = imagen;
        // Validar verificarImagenSeleccionada a true
        this.verificarImagenSeleccionada = true
      } else {
        // Mostrar mensaje de notificación
        this.imagenCargada = false;
        this.toastrService.error('La imagen es demasiado grande. Debe ser menor o igual a 2MB.', 'Error', {
          timeOut: 3000,
          positionClass: 'toast-top-center',
        });
        event.target.value = '';
      }
    }
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

  //LISTAR ÚLTIMA ACTA REGISTRADA
  mostrarActaId(): void {
    this.actaPdfService.listaUltimaSpIps().subscribe(
      data => {
        this.actaPdf = data
        var acta = (document.getElementById('acta')) as HTMLSelectElement
        acta.value = this.actaPdf.act_id!.toString()
      }
    )
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
    this.prestadorService.listMunIps(this.act_municipioId).subscribe(
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



  async obtenerNombreSelects(): Promise<void> {
    //SELECT MUNICIPIO
    if (this.act_municipioId) {
      const idMunicipioSeleccionado = this.act_municipioId;
      const mun = await this.municipioService.oneMunicipio(idMunicipioSeleccionado).toPromise();
      this.act_municipio = mun!.mun_nombre
    }

    if (this.act_prestadorId) {
      //SELECT PRESTADOR
      const idPrestadorSeleccionado = this.act_prestadorId;
      const pres = await this.prestadorService.listaOne(idPrestadorSeleccionado).toPromise();
      this.act_prestador = pres.pre_nombre
    }

    if (this.act_funcionarioId) {
      //SELECT FUNCIONARIO VERIFICADOR
      const idFuncionarioSeleccionado = this.act_funcionarioId;
      const idFuncionarioComoNumero = parseInt(idFuncionarioSeleccionado, 10);
      const func = await this.usuarioService.oneUser(idFuncionarioComoNumero).toPromise();
      this.act_nombre_funcionario = func!.usu_nombre + ' ' + func!.usu_apellido
    }
  }



  obtenerNombres(): void {
    //OBTENER NOMBRE DEL PRESTADOR
    const idp = document.getElementById('prestador') as HTMLSelectElement;
    const selp = idp.selectedIndex;
    const optp = idp.options[selp] as HTMLOptionElement;
    const valorPrestador = optp ? optp.textContent : '';
    localStorage.setItem("nombre-pres-sp-ips", valorPrestador!);
    this.sharedService.setNombrePrestador(valorPrestador!);


    //CODIGO PRESTADOR
    var codigoPres = (document.getElementById('codpres')) as HTMLInputElement
    var valorCodigoPres = codigoPres.value
    sessionStorage.setItem("cod-pres-sp-ips", valorCodigoPres);

    // USUARIO SECRETARIA
    const idUsuSecre = document.getElementById('usu_secretaria') as HTMLSelectElement;
    const selUsuSecre = idUsuSecre.selectedIndex;
    const optUsuSecre = idUsuSecre.options[selUsuSecre] as HTMLOptionElement;
    const valorUsuSecre = optUsuSecre ? optUsuSecre.textContent : '';
    sessionStorage.setItem("nombre-usuario-sp", valorUsuSecre!);

    //CARGO USUARIO SECRETARIA
    var cargoSecre = (document.getElementById('cargoSecre')) as HTMLInputElement
    var valorCargoSecre = cargoSecre.value
    sessionStorage.setItem("cargo-usuario-sp-ips", valorCargoSecre);

    //CARGO PRESTADOR
    var cargoPres = (document.getElementById('cargoPres')) as HTMLInputElement
    var valorCargoPres = cargoPres.value
    sessionStorage.setItem("cargo-prestador-sp-ips", valorCargoPres);
  }

  convertirHora12(act_hora_orden24: string): void {
    if (this.act_hora_orden24) {
      const [hora, minutos] = this.act_hora_orden24.split(":");
      let ampm = "AM";

      let horaNum = parseInt(hora, 10);

      if (horaNum >= 12) {
        ampm = "PM";
        if (horaNum > 12) {
          horaNum -= 12;
        }
      }

      this.act_hora_orden = `${horaNum}:${minutos} ${ampm}`;
    }//FIN FORMATO DE LA HORA A 12H
  }

  onRegister() {

  }
}
