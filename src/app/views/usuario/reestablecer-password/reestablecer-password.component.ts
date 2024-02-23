import { Component } from '@angular/core';
import { Usuario } from '../../../models/usuario';
import { RestablecerPasswordDto } from '../../../models/reset-password.dto';
import { UsuarioService } from '../../../services/usuario.service';
import { AuthService } from '../../../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SharedServiceService } from '../../../services/shared-service.service';

@Component({
  selector: 'app-reestablecer-password',
  templateUrl: './reestablecer-password.component.html',
  styleUrl: './reestablecer-password.component.scss'
})
export class ReestablecerPasswordComponent {


  usuario!: Usuario;

  passwordrest!: RestablecerPasswordDto

  password!: string

  nombreUsuario!: string;


  constructor(
    private usuarioService: UsuarioService,
    private authService: AuthService,
    private activatedRoute: ActivatedRoute,
    private toastrService: ToastrService,
    private sharedService: SharedServiceService,
    private toastr: ToastrService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.nombreUsuario = localStorage.getItem('nombreUsuario');
    const id = this.activatedRoute.snapshot.queryParams['id'];
    this.usuarioService.oneUser(id).subscribe(
      data => {
        this.usuario = data;
      },
      err => {
        this.toastr.error(err.error.message, 'Fail', {
          timeOut: 3000, positionClass: 'toast-top-center',
        });
        this.router.navigate(['/']);
      }
    );
  }


  onResetPassword(): void {
    this.passwordrest = new RestablecerPasswordDto(
      this.usuario.resetPasswordToken,
      this.password
    );
    this.authService.resetPassword(this.passwordrest).subscribe(
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
    this.nombreUsuario = ''
    localStorage.setItem('nombreUsuario', this.nombreUsuario);
  }
}
