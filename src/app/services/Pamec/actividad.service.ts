import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Actividad } from '../../models/Pamec/actividad.dto';


@Injectable({
  providedIn: 'root'
})
export class ActividadService {

  //actividadURL: 'http://localhost:8080/actividad/',

  actividadURL = environment.actividadURL

  constructor(private httpClient: HttpClient) { }

  public listByAct(act: string): Observable<Actividad[]>{
    return this.httpClient.get<Actividad[]>(this.actividadURL + act)
  }  

  public lista(): Observable<Actividad[]>{
    return this.httpClient.get<Actividad[]>(this.actividadURL)
  }

}
