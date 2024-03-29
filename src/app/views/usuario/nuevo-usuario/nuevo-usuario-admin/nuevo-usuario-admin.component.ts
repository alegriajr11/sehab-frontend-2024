import { Component } from '@angular/core';
import { TokenDto } from '../../../../models/token.dto';
import { NuevoUsuarioAdminDto } from '../../../../models/nuevo-usuario-admin.dto';
import { AuthService } from '../../../../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { TokenService } from '../../../../services/token.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nuevo-usuario-admin',
  templateUrl: './nuevo-usuario-admin.component.html',
  styleUrl: './nuevo-usuario-admin.component.scss'
})
export class NuevoUsuarioAdminComponent {

  usuarioAdmin!: NuevoUsuarioAdminDto;

  usu_cedula!: string;
  usu_nombre!: string;
  usu_apellido!: string;
  usu_email!: string;
  usu_cargo!: string;
  usu_area_profesional!: string;
  usu_nombreUsuario!: string;
  usu_password!: string;
  usu_firma: string = ''
  usu_estado!: string;

  constructor(
    private authService: AuthService,
    private toastrService: ToastrService,
    private tokenService: TokenService,
    private router: Router
  ) { }

  ngOnInit(): void {}

  onRegister(): void {
    this.usuarioAdmin = new NuevoUsuarioAdminDto(
      this.usu_cedula,
      this.usu_nombre,
      this.usu_apellido,
      this.usu_cargo,
      this.usu_area_profesional,
      this.usu_email,
      this.usu_nombreUsuario,
      this.usu_password,
      this.usu_firma,
      this.usu_estado
    );
    const token = this.tokenService.getToken() ?? ''
    const tokenDto: TokenDto = new TokenDto(token);

    this.authService.registroAdmin(this.usuarioAdmin, tokenDto).subscribe(
      (data) => {
        this.toastrService.success(data.message, 'Ok', {
          timeOut: 3000,
          positionClass: 'toast-top-center',
        });
        this.router.navigate(['/usuarios']);
      },
      (err) => {
        this.toastrService.error(err.error.message, 'Error', {
          timeOut: 3000,
          positionClass: 'toast-top-center',
        });
      }
    );
  }

}
