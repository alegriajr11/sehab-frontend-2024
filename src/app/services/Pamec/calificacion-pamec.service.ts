import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { CalificacionPamecDto } from '../../models/Pamec/calificacionPamec.dto';
import { TokenDto } from '../../models/token.dto';


@Injectable({
  providedIn: 'root'
})
export class CalificacionPamecService {

  constructor(private httpClient: HttpClient) { }

  calificacionPamecURL = environment.calificacionPamecURL

  //REGISTRO CALIFICACION
  createCalificacionPamec(dto: CalificacionPamecDto, tokenDto: TokenDto): Observable<any> {
    const body = {
      dto: dto,
      tokenDto: tokenDto
    }
    console.log(body.dto.cal_nota)
    return this.httpClient.post<any>(this.calificacionPamecURL, body);
  }
}
