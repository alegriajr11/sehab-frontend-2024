import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TokenService {


  roleAs!: string;
  constructor() {}

  isLogged(): boolean {
    if (this.getToken()) {
      return true;
    }
    return false;
  }

  setToken(token: string): void {
    localStorage.setItem('token', token);
  }

  getToken(): string | null {
    const token = localStorage.getItem('token');
    return token
  }

  getNombreUsuario(): string | null {
    if (!this.isLogged()) {
      return null;
    }
    const token = this.getToken();
    const payload = token?.split('.')[1];
    const values = atob(payload ?? '');
    const valuesJson = JSON.parse(values);
    const usu_nombreUsuario = valuesJson.usu_nombreUsuario;

    return usu_nombreUsuario;
  }

  getNombre(): string | null {
    if (!this.isLogged()) {
      return null;
    }
    const token = this.getToken();
    const payload = token?.split('.')[1];
    const values = atob(payload ?? '');
    const valuesJson = JSON.parse(values);
    const usu_nombre = valuesJson.usu_nombre;
    return usu_nombre;
  }



  getRole() {
    const token = this.getToken();
    const payload = token?.split('.')[1];
    const values = atob(payload ?? '');
    const valuesJson = JSON.parse(values);
    const usu_nombreUsuario = valuesJson.usu_nombreUsuario;
    const roles = valuesJson.roles;
    this.roleAs = localStorage.getItem(roles) ?? '';
    return this.roleAs;
  }

  isAdmin(): boolean | null{
    if (!this.isLogged()) {
      return null;
    }
    const token = this.getToken();
    const payload = token?.split('.')[1];
    const values = atob(payload ?? '');
    const valuesJson = JSON.parse(values);
    const usu_nombreUsuario = valuesJson.usu_nombreUsuario;
    const usu_estado = valuesJson.usu_estado;
    const roles = valuesJson.usu_roles;
    if (roles.indexOf('admin') < 0) {
      return false;
    }
    return true;
  }


  IsSic(): boolean | null {
    if (!this.isLogged()) {
      return null;
    }
    const token = this.getToken();
    const payload = token?.split('.')[1];
    const values = atob(payload ?? '');
    const valuesJson = JSON.parse(values);
    const usu_nombreUsuario = valuesJson.usu_nombreUsuario;
    const roles = valuesJson.usu_roles;
    if (roles.indexOf('sic') < 0) {
      return false;
    }
    return true;
  }

  IsSp(): boolean | null {
    if (!this.isLogged()) {
      return null;
    }
    const token = this.getToken();
    const payload = token?.split('.')[1];
    const values = atob(payload ?? '');
    const valuesJson = JSON.parse(values);
    const usu_nombreUsuario = valuesJson.usu_nombreUsuario;
    const roles = valuesJson.usu_roles;
    if (roles.indexOf('sp') < 0) {
      return false;
    }
    return true;
  }

  IsPamec(): boolean | null {
    if (!this.isLogged()) {
      return null;
    }
    const token = this.getToken();
    const payload = token?.split('.')[1];
    const values = atob(payload ?? '');
    const valuesJson = JSON.parse(values);
    const usu_nombreUsuario = valuesJson.usu_nombreUsuario;
    const roles = valuesJson.usu_roles;
    if (roles.indexOf('pamec') < 0) {
      return false;
    }
    return true;
  }

  IsReso(): boolean | null {
    if (!this.isLogged()) {
      return null;
    }
    const token = this.getToken();
    const payload = token?.split('.')[1];
    const values = atob(payload ?? '');
    const valuesJson = JSON.parse(values);
    const usu_nombreUsuario = valuesJson.usu_nombreUsuario;
    const roles = valuesJson.usu_roles;
    if (roles.indexOf('res') < 0) {
      return false;
    }
    return true;
  }

  IsContador(): boolean | null {
    if (!this.isLogged()) {
      return null;
    }
    const token = this.getToken();
    const payload = token?.split('.')[1];
    const values = atob(payload ?? '');
    const valuesJson = JSON.parse(values);
    const usu_nombreUsuario = valuesJson.usu_nombreUsuario;
    const roles = valuesJson.usu_roles;
    if (roles.indexOf('contador') < 0) {
      return false;
    }
    return true;
  }

  IsCoordinador(): boolean | null {
    if (!this.isLogged()) {
      return null;
    }
    const token = this.getToken();
    const payload = token?.split('.')[1];
    const values = atob(payload ?? '');
    const valuesJson = JSON.parse(values);
    const usu_nombreUsuario = valuesJson.usu_nombreUsuario;
    const roles = valuesJson.usu_roles;
    if (roles.indexOf('coordinador') < 0) {
      return false;
    }
    return true;
  }

  logOut(): void {
    localStorage.clear();
  }
}
