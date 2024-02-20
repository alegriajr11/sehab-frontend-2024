import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DefaultLayoutComponent } from './containers';
import { LoginGuard } from './guards/login.guard';
import { LoginComponent } from './views/pages/login/login.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },

  {
    path: '',
    component: DefaultLayoutComponent,
    data: {
      title: 'Inicio'
    },
    children: [
      {
        path: 'inicio',
        loadChildren: () =>
          import('./views/dashboard/dashboard.module').then((m) => m.DashboardModule),
          canActivateChild: [LoginGuard]
      },
      {
        path: 'sic',
        loadChildren: () =>
          import('./views/roles/sic/sic.module').then((m) => m.SicModule),
          canActivateChild: [LoginGuard]
      },
      {
        path: 'sp',
        loadChildren: () =>
          import('./views/roles/sp/sp.module').then((m) => m.SpModule),
          canActivateChild: [LoginGuard]
      },
      {
        path: 'usuarios',
        loadChildren: () =>
          import('./views/usuario/usuario.module').then((m) => m.UsuarioModule),
          canActivateChild: [LoginGuard]
      },
      {
        path: 'pamec',
        loadChildren: () =>
          import('./views/roles/pamec/pamec.module').then((m) => m.PamecModule),
          canActivateChild: [LoginGuard]
      },

      // {
      //   path: 'pages',
      //   loadChildren: () =>
      //     import('./views/pages/login.module').then((m) => m.LoginModule)
      // },
    ]
  },

  {
    path: 'login',
    component: LoginComponent,
    canActivate: [LoginGuard],
    data: {
      title: 'Login Page'
    }
  },

  {path: '**', redirectTo: 'dashboard'}
];
@NgModule({
  imports: [RouterModule.forRoot(routes,
    {
      scrollPositionRestoration: 'top',
      anchorScrolling: 'enabled',
      initialNavigation: 'enabledBlocking'
      // relativeLinkResolution: 'legacy'
    })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
