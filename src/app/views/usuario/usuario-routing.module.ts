import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaUsuarioComponent } from './lista-usuario/lista-usuario.component';
import { AuditoriaComponent } from './admin/auditoria/auditoria.component';
import { NuevoUsuarioComponent } from './nuevo-usuario/nuevo-usuario.component';
import { NuevoUsuarioAdminComponent } from './nuevo-usuario/nuevo-usuario-admin/nuevo-usuario-admin.component';
import { NuevoUsuarioRolComponent } from './nuevo-usuario/nuevo-usuario-rol/nuevo-usuario-rol.component';
import { EditarUsuarioComponent } from './editar-usuario/editar-usuario.component';
import { ReestablecerPasswordComponent } from './reestablecer-password/reestablecer-password.component';

const routes: Routes = [
    {
        path: '',
        data: {
            title: 'Usuarios'
        },
        children: [
            {
                path: '',
                pathMatch: 'full',
                component: ListaUsuarioComponent,
            },
            {
                path: 'auditoria',
                component: AuditoriaComponent,
                data: {
                    title: 'Auditoria - Control de Registros',
                },
            },
            {
                path: 'nuevo-usuario',
                component: NuevoUsuarioComponent,
                data: {
                    title: 'Nuevo Usuario',
                },
            },
            {
                path: 'nuevo-admin',
                component: NuevoUsuarioAdminComponent,
                data: {
                    title: 'Nuevo Usuario Administrador',
                }
            },
            {
                path: 'nuevo-rol',
                component: NuevoUsuarioRolComponent,
                data: {
                    title: 'Nuevo Usuario Rol',
                }
            },
            {
                path: 'editar-usuario',
                component: EditarUsuarioComponent,
                data: {
                    title: 'Editar Usuario',
                }
            },
            {
                path: 'restablecer-pass',
                component: ReestablecerPasswordComponent,
                data: {
                    title: 'Editar Usuario',
                }
            }
        ],
    },

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class UsuarioRoutingModule { }
