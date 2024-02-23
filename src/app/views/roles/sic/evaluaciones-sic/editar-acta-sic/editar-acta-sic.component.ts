import { Component } from '@angular/core';
import { ActaSicPdfDto } from '../../../../../models/Actas/actaSicpdf.dto';
import { Usuario } from '../../../../../models/usuario';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ActapdfService } from '../../../../../services/Sic/actapdf.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuarioService } from '../../../../../services/usuario.service';
import { ToastrService } from 'ngx-toastr';
import { TokenService } from '../../../../../services/token.service';
import { SharedServiceService } from '../../../../../services/shared-service.service';

@Component({
  selector: 'app-editar-acta-sic',
  templateUrl: './editar-acta-sic.component.html',
  styleUrl: './editar-acta-sic.component.scss'
})
export class EditarActaSicComponent {

  actaSic: ActaSicPdfDto = null
  //ALMACENAR LA FIRMA DEL PRESTADOR DEL SERVICIO COMPARTIDO
  firma: string;

  usuario: Usuario[] = null;
  act_cargo_funcionario: string
  act_nombre_prestador: string

  //Habilitar la Fecha Final
  habilitarfechaFin = false;

  //HABILITAR FIRMA
  acta_firmada: boolean = true;
  //NO FIRMA ACTA
  noFirmaActa: string = 'false';
  //RECIBE VISITA
  act_recibe_visita: string

  //MODAL
  public modalRef: BsModalRef;

  constructor(
    private actaPdfService: ActapdfService,
    private activatedRoute: ActivatedRoute,
    private usuarioService: UsuarioService,
    private modalService: BsModalService,
    private toastr: ToastrService,
    private tokenService: TokenService,
    public sharedService: SharedServiceService,
    private router: Router
  ) {}

  
  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.queryParams['id'];
    this.actaPdfService.oneActaSic(id).subscribe(
      data => {
        this.actaSic = data;
        this.act_nombre_prestador = data.act_nombre_prestador
        this.firma = data.act_firma_prestador
        this.noFirmaActa = data.noFirmaActa
        this.act_recibe_visita = data.act_recibe_visita
      },
      err => {
        this.toastr.error(err.error.message, 'Fail', {
          timeOut: 3000, positionClass: 'toast-top-center',
        });
        this.router.navigate(['/']);
      }
    );

    //this.unsoloCheckbox();
  }

  onUpdate(): void {
    
  }

  volver() {
    this.router.navigate(['/sic/evaluaciones-sic'])
    // Remover el item
    localStorage.removeItem('boton-editar-acta-sic');
  }
}
