import { Component } from '@angular/core';
import { filterNavItemsByRoles, navItems } from './_nav';
import { TokenService } from '../../services/token.service';

@Component({
  selector: 'app-default-layout',
  templateUrl: './default-layout.component.html',
  styleUrl: './default-layout.component.scss'
})
export class DefaultLayoutComponent {


  public navItems = navItems;

  isAdmin!: boolean;
  isSic!: boolean;
  isSp!: boolean;
  isPamec!: boolean;
  isReso!: boolean;
  isCoordinador!: boolean;
  isContador!: boolean;


  constructor(
    private tokenService: TokenService,
  ) { }

  ngOnInit() {
    this.verificarRolUsuario();
  }

  verificarRolUsuario(): void {

    // Obtener los roles del usuario actual
    const userRoles: string[] = [];

    if (this.isAdmin = this.tokenService.isAdmin() ?? false) {
      userRoles.push('admin');
    }

    if (this.isSic = this.tokenService.IsSic() ?? false) {
      userRoles.push('sic')
    }

    if (this.isSp = this.tokenService.IsSp() ?? false) {
      userRoles.push('sp')
    }

    if (this.isPamec = this.tokenService.IsPamec() ?? false) {
      userRoles.push('pamec')
    }

    if (this.isReso = this.tokenService.IsReso() ?? false) {
      userRoles.push('res')
    }

    if (this.isContador = this.tokenService.IsContador() ?? false) {
      userRoles.push("contador")
    }

    if (this.isCoordinador = this.tokenService.IsCoordinador() ?? false) {
      userRoles.push('coordinador')
    }

    // Filtrar elementos de navegación basados en roles del usuario
    this.navItems = filterNavItemsByRoles(userRoles);
  }
}
