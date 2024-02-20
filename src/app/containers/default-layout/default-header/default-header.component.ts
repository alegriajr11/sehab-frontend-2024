import { Component, ElementRef, Input, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { ClassToggleService } from '@coreui/angular';
import { TokenService } from '../../../services/token.service';

@Component({
  selector: 'app-default-header',
  templateUrl: './default-header.component.html',
  styleUrl: './default-header.component.scss'
})
export class DefaultHeaderComponent {


  @Input() sidebarId: string = "sidebar";

  isLogged!: boolean;
  isAdmin!: boolean;
  isSic!: boolean;
  isSp!: boolean;
  isPamec!: boolean;
  isReso!: boolean;
  isCoordinador!: boolean;
  isContador!: boolean;

  usu_nombreUsuario!: string;
  usu_nombre!: string;

  role: string = '';

  reload: 'reload' | undefined = undefined;

  numeroDeNotificaciones!: number

  isDropdownOpen = false

  sidebarVisible = false;

  public newMessages = new Array(4)
  public newTasks = new Array(5)
  public newNotifications = new Array(5)

  constructor(private classToggler: ClassToggleService,
    private tokenService: TokenService,
    private router: Router,
    private renderer: Renderer2,
    private el: ElementRef) { }

  ngOnInit(): void {
    this.isLogged = this.tokenService.isLogged();
    this.isAdmin = this.tokenService.isAdmin() ?? false;
    this.isSic = this.tokenService.IsSic() ?? false;
    this.isSp = this.tokenService.IsSp() ?? false;
    this.isPamec = this.tokenService.IsPamec() ?? false;
    this.isReso = this.tokenService.IsReso() ?? false;
    this.isContador = this.tokenService.IsContador() ?? false;
    this.isCoordinador = this.tokenService.IsCoordinador() ?? false;
    this.usu_nombreUsuario = this.tokenService.getNombreUsuario() ?? '';
    this.usu_nombre = this.tokenService.getNombre() ?? '';

    //
    this.mostrarRolMenu();
  }

  //METODO CERRAR SESIÓN
  logOut(): void {
    this.tokenService.logOut();
    this.router.navigate(['/login']);
  }

  //METODO MOSTRAR QUE TIPO DE ROL ES EL USUARIO LOGUEADO
  mostrarRolMenu() {
    if (this.isAdmin = this.tokenService.isAdmin() ?? false) {
      this.role = 'Admin'
    } else if (this.isSic = this.tokenService.IsSic() ?? false) {
      this.role = 'Sic'
    }
    else if (this.isSic = this.tokenService.IsPamec() ?? false) {
      this.role = 'Pamec'
    }
    else if (this.isSp = this.tokenService.IsSp() ?? false) {
      this.role = 'Seguridad del Paciente'
    }
    else if (this.isSic = this.tokenService.IsReso() ?? false) {
      this.role = 'Resolución 3100'
    }
  }

  toggleSidebar() {
    this.sidebarVisible = !this.sidebarVisible;
    console.log('sidebarVisible:', this.sidebarVisible);
  }
}
