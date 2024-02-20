import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Clase } from '../../models/Prestador/clase';


@Injectable({
  providedIn: 'root'
})
export class ClaseService {

  claseURL = environment.claseURL;

  constructor(private httpClient: HttpClient) { }

  public lista(): Observable<Clase[]> {
    return this.httpClient.get<Clase[]>(`${this.claseURL}`);
  }

}
