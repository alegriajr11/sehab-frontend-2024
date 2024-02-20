import { Component } from '@angular/core';
import { AuditoriaService } from '../../../../services/Auditoria/auditoria.service';

@Component({
  selector: 'app-auditoria',
  templateUrl: './auditoria.component.html',
  styleUrl: './auditoria.component.scss'
})
export class AuditoriaComponent {


  auditoria: any[] = [];

  fechaInicio!: Date
  fechaFin: Date | null = null;
  fechaMinima!: string
  accion: string = '';

  i!: number;

  nombre_usuario!: string;

  habilitarfechaFin = false;

  listaVacia: any = undefined;
  public page: number = 1;


  constructor(private auditoria_services: AuditoriaService) { }

  ngOnInit(): void {
    this.getAllAuditorias()
  }

limpiarFechaFinal() {
  this.fechaFin = null as Date | null;
}

  habilitarFechaFinal() {
    this.habilitarfechaFin = true;
  }

  obtenerFechaActual(): string {
    const fechaActual = new Date();
    const dia = fechaActual.getDate().toString().padStart(2, '0');
    const mes = (fechaActual.getMonth() + 1).toString().padStart(2, '0'); // Enero es 0
    const anio = fechaActual.getFullYear().toString();
    return `${anio}-${mes}-${dia}`;
  }

  actualizarFechaMinima(): void {
    const fechaInicioSeleccionada = new Date(this.fechaInicio);
    const dia = fechaInicioSeleccionada.getDate().toString().padStart(2, '0');
    const mes = (fechaInicioSeleccionada.getMonth() + 1).toString().padStart(2, '0'); // Enero es 0
    const anio = fechaInicioSeleccionada.getFullYear().toString();
    this.fechaMinima = `${anio}-${mes}-${dia}`;
  }


  // Función auxiliar para ajustar la fecha si es válida
private ajustarFecha(fecha: Date | null): Date | null {
  if (fecha) {
    const fechaAjustada = new Date(fecha);
    fechaAjustada.setDate(fechaAjustada.getDate() + 1);
    return fechaAjustada;
  }
  return fecha;
}

  //CARGAR AUDITORIAS POR FECHAS O ACCION
  cargarAuditorias() {
    const fechaFinAjustada = this.ajustarFecha(this.fechaFin);
      this.auditoria_services.listAdutitoria(this.fechaInicio, fechaFinAjustada!, this.accion).subscribe(
        data => {
          this.auditoria = data;
          this.listaVacia = undefined;
        },
        err => {
          this.listaVacia = err.error.message;
          this.auditoria = [];
        }
      );
      this.page = 1;
  }
  

  getAllAuditorias() {
    this.auditoria_services.listAllAuditorias().subscribe(
      data => {
        this.auditoria = data
        this.listaVacia = undefined
      },
      err => {
        this.listaVacia = err.error.message;
        this.auditoria = []
      }
    )
    this.page = 1;
  }

  //CARGAR AUDITORIAS POR NOMBRE DE USUARIO
  cargarAuditoriaUsuario() {
    this.auditoria_services.listAuditoriaNombreUsuario(this.nombre_usuario).subscribe(
      data => {
        this.auditoria = data
        this.listaVacia = undefined
      },
      err => {
        this.listaVacia = err.error.message;
        this.auditoria = []
      }
    )
    if (!this.nombre_usuario) {
      this.getAllAuditorias();
    }
    this.page = 1;
  }

  // Método para calcular el ID global
  calcularIDGlobal(index: number, currentPage: number, itemsPerPage: number): number {
    return index + 1 + (currentPage - 1) * itemsPerPage;
  }


}
