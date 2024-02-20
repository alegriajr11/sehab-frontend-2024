import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Clasificacion } from '../../models/Prestador/clasificacion';

@Injectable({
  providedIn: 'root'
})
export class ClasificacionService {
  
  clasificacionURL = environment.clasificacionURL;

  constructor(private httpClient: HttpClient) { }

  public lista(): Observable<Clasificacion[]> {
    return this.httpClient.get<Clasificacion[]>(`${this.clasificacionURL}`);
  }

}
