import { Component } from '@angular/core';
import { UsuarioService } from '../../../services/usuario.service';
import { TokenService } from '../../../services/token.service';
import { AuthService } from '../../../services/auth.service';
import { AuditoriaService } from '../../../services/Auditoria/auditoria.service';
import { SharedServiceService } from '../../../services/shared-service.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lista-usuario',
  templateUrl: './lista-usuario.component.html',
  styleUrl: './lista-usuario.component.scss'
})
export class ListaUsuarioComponent {

  usuarios: any[] = [];


  usu_id!: number

  listaVacia: any = undefined;

  isAdmin!: boolean;
  botonUpdate = true;
  botonDelete = true;

  usu_estado!: string;

  constructor(
    private usuarioService: UsuarioService,
    private tokenService: TokenService,
    private authService: AuthService,
    private auditoriaService: AuditoriaService,
    private sharedService: SharedServiceService,
    private toastrService: ToastrService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.cargarUsuarios();
    this.isAdmin = this.tokenService.isAdmin() ?? false;
  }

  cargarUsuarios(): void {
    this.usuarioService.lista().subscribe(
      data => {
        this.usuarios = data;
        this.listaVacia = undefined;
      },
      err => {
        this.listaVacia = err.error.message;
      }
    );
  }

  restablecer(usu_id: number, usu_nombre: string, usu_apellido: string): void {
    const nombreUsuarioCompleto = usu_nombre + ' ' + usu_apellido
    localStorage.setItem('nombreUsuario', nombreUsuarioCompleto);
    this.authService.requestPassword(usu_id).subscribe()
  }

  crearPDF(): void {
    this.usuarioService.pdf()
  }

  downloadBackup() {
    this.auditoriaService.createBackup().subscribe((data: any) => {
      const url = window.URL.createObjectURL(data);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'backup.sql');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    });
  }
  
}
