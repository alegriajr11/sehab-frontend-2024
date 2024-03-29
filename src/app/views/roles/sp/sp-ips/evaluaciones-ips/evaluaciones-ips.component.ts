import { Component, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { SharedServiceService } from '../../../../../services/shared-service.service';
import { ActapdfService } from '../../../../../services/Sic/actapdf.service';
import { TokenService } from '../../../../../services/token.service';

@Component({
  selector: 'app-evaluaciones-ips',
  templateUrl: './evaluaciones-ips.component.html',
  styleUrl: './evaluaciones-ips.component.scss'
})
export class EvaluacionesIpsComponent {



  evaluaciones: any[] = [];

  listaVacia: any = undefined;

  searchText: any;

  //Atributos de busqueda
  year!: number
  act_id!: number
  //PRESTADOR O NIT
  act_prestador: string = ''
  act_nit: string = ''

  public modalRef!: BsModalRef;

  public fechaSeleccionada!: string;

  public page!: number;

  constructor(
    private modalService: BsModalService,
    public sharedService: SharedServiceService,
    private actapdfService: ActapdfService,
    private tokenService: TokenService,
  ) { }


  ngOnInit(): void {
    // Escuchar el evento popstate del navegador
    window.addEventListener('popstate', () => {
      // Eliminar el elemento al navegar hacia atrás
      localStorage.removeItem('boton-editar-evaluacion-sp-ips');
      localStorage.removeItem('id_evaluacion_ips');
      localStorage.removeItem('nombre-pres-sp-ips');
      localStorage.removeItem('id_acta')
    });
    this.incializarMetodos();
  }

  incializarMetodos() {
    this.cargarActas();
    this.obtenerAnios();
  }


  //CARGAR TODAS LAS ACTAS REALIZANDO LA SOLICITUD AL SERVICIO IPS
  cargarActas(): void {
    const token = this.tokenService.getToken() ?? ''
    this.actapdfService.listaSpIps(token).subscribe(
      data => {
        this.evaluaciones = data;
        this.listaVacia = undefined;
      },
      err => {
        this.listaVacia = err.error.message;
      }
    );
    this.page = 1;
  }


  openModal(modalTemplate: TemplateRef<any>, id: number, name: string, name_funcionario: string, cod_prestador: string) {
    this.sharedService.setIdActaIps(id) //Envia el id del Acta
    this.sharedService.setNombrePrestador(name)
    this.sharedService.setNombreFuncionario(name_funcionario)
    this.sharedService.setIdPrestador(cod_prestador)
    this.modalRef = this.modalService.show(modalTemplate,
      {
        class: 'modal-dialogue-centered modal-md',
        backdrop: true,
        keyboard: true
      }
    );

    // Suscribirse al evento hide.bs.modal para cargar actas después de cerrar el modal y ver el icono cerrar acta
    this.modalRef.onHide?.subscribe(() => {
      this.cargarActas();
    });
  }


  obtenerAnios(): void {
    const selectAnio = document.getElementById("select-year") as HTMLSelectElement;
    const fechaActual = new Date();
    const anioActual = fechaActual.getFullYear();

    for (let i = anioActual; i >= 1900; i--) {
      const option = document.createElement("option");
      option.text = i.toString();
      option.value = i.toString();
      selectAnio.add(option);
    }
  }



  //CARGAR ACTAS POR ID_ACTA O AÑO O NOMBRE DE PRESTADOR O NIT
  cargarActasFilter() {
    //OBTENER EL TOKEN DEL USUARIO 
    const token = this.tokenService.getToken() ?? ''
    this.actapdfService.listaActasSpIpsFilter(this.year, this.act_id, this.act_prestador, this.act_nit, token).subscribe(
      data => {
        this.evaluaciones = data
        this.listaVacia = undefined
      },
      err => {
        this.listaVacia = err.error.message;
        this.evaluaciones = []
      }
    )
    if (!this.year && !this.act_id && !this.act_prestador && !this.act_nit) {
      this.cargarActas();
    }
  }

}
