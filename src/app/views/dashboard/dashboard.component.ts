import { Component } from '@angular/core';
import { TokenService } from '../../services/token.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

  usu_nombreUsuario!: string;
  usu_nombre!: string;
  isLogged!: boolean;


  constructor(
    private tokenService: TokenService,
  ) {}

  ngOnInit(): void {
    // Escuchar el evento popstate del navegador
    window.addEventListener('popstate', () => {
      // Eliminar el elemento al navegar hacia atrás
      localStorage.removeItem('boton-editar-acta-sic');
    });
    this.usu_nombreUsuario = this.tokenService.getNombreUsuario() ?? '';
    this.isLogged = this.tokenService.isLogged();
    this.usu_nombre = this.tokenService.getNombre() ?? '';

  }

}
