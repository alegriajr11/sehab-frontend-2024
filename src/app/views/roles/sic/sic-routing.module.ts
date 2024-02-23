import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { ActaSicComponent } from './acta-sic/acta-sic.component';
import { EvaluacionesSicComponent } from './evaluaciones-sic/evaluaciones-sic.component';
import { EditarActaSicComponent } from './evaluaciones-sic/editar-acta-sic/editar-acta-sic.component';
import { EditarActaSicGuard } from '../../../guards/editar-acta-sic.guard';
import { ButtonGuard } from '../../../guards/button.guard';


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
            {
                path: 'editar-acta-sic',
                component: EditarActaSicComponent,
                canActivate: [EditarActaSicGuard, ButtonGuard],
                data: {
                    title: 'Sistema Información para la Calidad - Editar Acta',
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
