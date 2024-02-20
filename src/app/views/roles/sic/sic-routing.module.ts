import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { ActaSicComponent } from './acta-sic/acta-sic.component';
import { EvaluacionesSicComponent } from './evaluaciones-sic/evaluaciones-sic.component';


const routes: Routes = [
    {
        path: '',
        children: [
            {
                path: 'acta-evaluacion',
                component: ActaSicComponent,
                data: {
                    title: 'Sistema Información para la Calidad - Crear Acta',
                },
            },
            {
                path: 'evaluaciones-sic',
                component: EvaluacionesSicComponent,
                data: {
                    title: 'Sistema Información para la Calidad - Evaluaciones Realizadas',
                },
            },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class SicRoutingModule { }
