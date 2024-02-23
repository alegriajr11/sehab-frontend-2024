import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DefaultFooterComponent, DefaultHeaderComponent, DefaultLayoutComponent } from './containers';
import { AvatarModule, BreadcrumbModule, ButtonModule, CardModule, DropdownModule, FooterModule, GridModule, HeaderModule, ModalModule, NavModule, SidebarModule, ToastModule } from '@coreui/angular';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { DashboardComponent } from './views/dashboard/dashboard.component';
import { LoginComponent } from './views/pages/login/login.component';
import { ToastrModule } from 'ngx-toastr';
import { LocationStrategy, PathLocationStrategy } from '@angular/common';
import { IconModule, IconSetService } from '@coreui/icons-angular';
import { LoadingInterceptor } from './interceptors/loading.interceptor';
import { interceptorProvider } from './interceptors/usuario.interceptor';
import { ActaSicComponent } from './views/roles/sic/acta-sic/acta-sic.component';
import { EvaluacionSicComponent } from './views/roles/sic/evaluacion-sic/evaluacion-sic.component';
import { EvaluacionesSicComponent } from './views/roles/sic/evaluaciones-sic/evaluaciones-sic.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { PagesModule } from './views/pages/pages.module';
import { ActaIpsComponent } from './views/roles/sp/sp-ips/acta-ips/acta-ips.component';
import { EvaluacionIpsComponent } from './views/roles/sp/sp-ips/evaluacion-ips/evaluacion-ips.component';
import { ActaIndependientesComponent } from './views/roles/sp/sp-independientes/acta-independientes/acta-independientes.component';
import { EvaluacionIndependientesComponent } from './views/roles/sp/sp-independientes/evaluacion-independientes/evaluacion-independientes.component';
import { EvaluacionesIndependientesComponent } from './views/roles/sp/sp-independientes/evaluaciones-independientes/evaluaciones-independientes.component';
import { EvaluacionesIpsComponent } from './views/roles/sp/sp-ips/evaluaciones-ips/evaluaciones-ips.component';
import { ActaPamecComponent } from './views/roles/pamec/acta-pamec/acta-pamec.component';
import { EvaluacionPamecComponent } from './views/roles/pamec/evaluacion-pamec/evaluacion-pamec.component';
import { EvaluacionesPamecComponent } from './views/roles/pamec/evaluaciones-pamec/evaluaciones-pamec.component';
import { SpModule } from './views/roles/sp/sp.module';
import { BsModalService } from 'ngx-bootstrap/modal';
import { ListaUsuarioComponent } from './views/usuario/lista-usuario/lista-usuario.component';
import { NuevoUsuarioComponent } from './views/usuario/nuevo-usuario/nuevo-usuario.component';
import { EditarUsuarioComponent } from './views/usuario/editar-usuario/editar-usuario.component';
import { NuevoUsuarioRolComponent } from './views/usuario/nuevo-usuario/nuevo-usuario-rol/nuevo-usuario-rol.component';
import { NuevoUsuarioAdminComponent } from './views/usuario/nuevo-usuario/nuevo-usuario-admin/nuevo-usuario-admin.component';
import { AuditoriaComponent } from './views/usuario/admin/auditoria/auditoria.component';
import { CriterioSpIndependientesComponent } from './views/usuario/admin/criterio-sp-independientes/criterio-sp-independientes.component';
import { CriterioSpIpsComponent } from './views/usuario/admin/criterio-sp-ips/criterio-sp-ips.component';
import { CriterioPamecComponent } from './views/usuario/admin/criterio-pamec/criterio-pamec.component';
import { CriterioSicComponent } from './views/usuario/admin/criterio-sic/criterio-sic.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { UsuarioModule } from './views/usuario/usuario.module';
import { ModalFirmaRolComponent } from './views/usuario/nuevo-usuario/nuevo-usuario-rol/modal-firma-rol/modal-firma-rol.component';
import { ReestablecerPasswordComponent } from './views/usuario/reestablecer-password/reestablecer-password.component';
import { ModalCalificacionPamecComponent } from './views/roles/pamec/evaluacion-pamec/modal-calificacion-pamec/modal-calificacion-pamec.component';
import { ModalEvaluacionesSicComponent } from './views/roles/sic/evaluaciones-sic/modal-evaluaciones-sic/modal-evaluaciones-sic.component';


const APP_CONTAINERS = [
  DefaultFooterComponent,
  DefaultHeaderComponent,
  DefaultLayoutComponent
];

@NgModule({
  declarations: [
    AppComponent,
    ...APP_CONTAINERS,
    DashboardComponent,
    LoginComponent,
    ActaSicComponent,
    EvaluacionSicComponent,
    EvaluacionesSicComponent,
    ActaIpsComponent,
    EvaluacionIpsComponent,
    ActaIndependientesComponent,
    EvaluacionIndependientesComponent,
    EvaluacionesIndependientesComponent,
    EvaluacionesIpsComponent,
    ActaPamecComponent,
    EvaluacionPamecComponent,
    ModalCalificacionPamecComponent,
    EvaluacionesPamecComponent,
    ListaUsuarioComponent,
    NuevoUsuarioComponent,
    EditarUsuarioComponent,
    NuevoUsuarioRolComponent,
    NuevoUsuarioAdminComponent,
    AuditoriaComponent,
    CriterioSpIndependientesComponent,
    CriterioSpIpsComponent,
    CriterioPamecComponent,
    CriterioSicComponent,
    ModalFirmaRolComponent,
    ReestablecerPasswordComponent,
    ModalEvaluacionesSicComponent

  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ToastrModule.forRoot(),
    SidebarModule,
    NgScrollbarModule,
    FormsModule,
    CardModule,
    DropdownModule,
    NavModule,
    ReactiveFormsModule,
    BreadcrumbModule,
    AvatarModule,
    HeaderModule,
    HttpClientModule,
    NgxPaginationModule,
    GridModule,
    ButtonModule,
    ToastModule,
    IconModule,
    ModalModule,
    PagesModule,
    FooterModule,
    SpModule,
    UsuarioModule
    
  ],
  providers: [
    {
      provide: LocationStrategy,
      useClass: PathLocationStrategy
    },
    BsModalService,
    IconSetService,
    interceptorProvider,
    { provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true },
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
