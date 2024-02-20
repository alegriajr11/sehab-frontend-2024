import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActaPamecComponent } from './acta-pamec/acta-pamec.component';
import { EvaluacionesPamecComponent } from './evaluaciones-pamec/evaluaciones-pamec.component';
import { EvaluacionPamecComponent } from './evaluacion-pamec/evaluacion-pamec.component';

const routes: Routes = [
    {
        path: '',
        children: [
            {
                path: 'acta-evaluacion',
                component: ActaPamecComponent,
                data: {
                    title: 'PAMEC - Crear Acta',
                },
            },
            {
                path: 'evaluaciones-pamec',
                component: EvaluacionesPamecComponent,
                data: {
                    title: 'PAMEC - Evaluaciones Realizadas',
                },
            },
            {
                path: 'evaluacion-pamec',
                component: EvaluacionPamecComponent,
                data: {
                    title: 'PAMEC - Evaluacion',
                },
            },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PamecRoutingModule { }
