import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Municipio } from '../../models/Prestador/municipio';


@Injectable({
  providedIn: 'root'
})
export class MunicipioService {

  municipioURL = environment.municipioURL;

  constructor(private httpClient: HttpClient) { }

  public lista(): Observable<Municipio[]> {
    return this.httpClient.get<Municipio[]>(`${this.municipioURL}`);
  }

  public oneMunicipio(id: string): Observable<Municipio> {
    return this.httpClient.get<Municipio>(`${this.municipioURL}` + id);
  }
}
