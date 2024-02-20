import { Component, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { SharedServiceService } from '../../../../services/shared-service.service';
import { ActapdfService } from '../../../../services/Sic/actapdf.service';
import { TokenService } from '../../../../services/token.service';

@Component({
  selector: 'app-evaluaciones-sic',
  templateUrl: './evaluaciones-sic.component.html',
  styleUrl: './evaluaciones-sic.component.scss'
})
export class EvaluacionesSicComponent {


  evaluaciones: any[] = [];

  listaVacia: any = undefined;

  //Atributos de busqueda
  year!: number
  act_id!: number
  //PRESTADOR O NIT
  act_prestador!: string
  act_nit!: string


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
      localStorage.removeItem('boton-editar-acta-sic');
    });
    this.incializarMetodos();
  }

  incializarMetodos() {
    this.cargarActas();
    this.obtenerAnios();
  }

  //LISTAR LAS ACTAS DEL ROL DE SIC
  cargarActas(): void {
    const token = this.tokenService.getToken() ?? ''
    this.actapdfService.listaSic(token).subscribe(
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

  //OBTENER LOS AÑOS PARA PODER FILTRAR LAS ACTAS
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

  openModal(modalTemplate: TemplateRef<any>, id: number, name: string, name_funcionario: string, codigo_prestador: string) {
    this.sharedService.setIdEvaluacionSic(id)
    this.sharedService.setNombrePrestador(name)
    this.sharedService.setNombreFuncionario(name_funcionario)
    this.sharedService.setIdPrestador(codigo_prestador)
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

  //CARGAR ACTAS POR ID_ACTA O AÑO O NOMBRE DE PRESTADOR O NIT
  cargarActasFilter() {
    //OBTENER EL TOKEN DEL USUARIO 
    const token = this.tokenService.getToken() ?? ''
    this.actapdfService.listaActasSicFilter(this.year, this.act_id, this.act_prestador, this.act_nit, token).subscribe(
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
