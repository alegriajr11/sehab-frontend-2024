import { Component } from '@angular/core';
import { LoginUsuarioDto } from '../../../models/login-usuario.dto';
import { AuthService } from '../../../services/auth.service';
import { TokenService } from '../../../services/token.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  usuario!: LoginUsuarioDto;

  errorMensaje!: string;

  usu_nombreUsuario!: string;
  usu_password!: string;

  hide!: boolean;

  constructor(
    private authService: AuthService,
    private tokenService: TokenService,
    private toastrService: ToastrService,
    private router: Router
  ) { }


  onLogin(): void {
    this.usuario = new LoginUsuarioDto(this.usu_nombreUsuario, this.usu_password);
    this.authService.login(this.usuario).subscribe(
      data => {
        if (!data.token) {
          this.toastrService.error(data.response.message, 'Error', {
            timeOut: 3000,
            positionClass: 'toast-top-center',
          });
          console.log('error2')
        } else {
          this.tokenService.setToken(data.token);
          this.router.navigate(['/inicio']);
        }

      },
      err => {
        this.toastrService.error(err.error.message, 'Error', {
          timeOut: 3000,
          positionClass: 'toast-top-center',
        });
        console.log(err.error.message)
      }
    );
  }
}
