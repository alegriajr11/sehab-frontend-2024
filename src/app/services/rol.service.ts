import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Rol } from '../models/roles';
import { Usuario } from '../models/usuario';


@Injectable({
  providedIn: 'root'
})
export class RolService {
  
  rolURL = environment.rolURL;

  constructor(private httpClient: HttpClient) { }

  public lista(): Observable<Rol[]> {
    return this.httpClient.get<Rol[]>(`${this.rolURL}`);
  }

}
