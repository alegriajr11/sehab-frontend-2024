import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActaIpsComponent } from './sp-ips/acta-ips/acta-ips.component';
import { EvaluacionesIndependientesComponent } from './sp-independientes/evaluaciones-independientes/evaluaciones-independientes.component';
import { EvaluacionesIpsComponent } from './sp-ips/evaluaciones-ips/evaluaciones-ips.component';
import { ActaIndependientesComponent } from './sp-independientes/acta-independientes/acta-independientes.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path:'acta-independientes',
        component: ActaIndependientesComponent,
        data: {
          title: 'Seguridad del Paciente - Acta Profesionales Independientes'
        },
      },
      {
        path: 'evaluaciones-independientes',
        component: EvaluacionesIndependientesComponent,
        data: {
          title: 'Seguridad del Paciente - Evaluaciones Profesionales Independientes'
        },
      },
      {
        path: 'acta-ips',
        component: ActaIpsComponent,
        data: {
          title: 'Seguridad del Paciente - Acta IPS'
        },
      },
      {
        path: 'evaluaciones-ips',
        component: EvaluacionesIpsComponent,
        data: {
          title: 'Seguridad del Paciente - Evaluaciones IPS'
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SpRoutingModule { }
