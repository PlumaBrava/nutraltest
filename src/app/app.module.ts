import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';






//// Componentes Externos


import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { environment } from '../environments/environment';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
// import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

// https://github.com/angular/angularfire2

import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireDatabaseModule } from '@angular/fire/database';  //Firedatabase
import { AngularFirestoreModule   } from '@angular/fire/firestore/'; //Cloud Firestore
import { AngularFireMessagingModule } from '@angular/fire/messaging'; //Messaging

import { AngularFireStorageModule } from '@angular/fire/storage';
import { HttpClientModule,HttpClientXsrfModule } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

// Maps
import { AgmCoreModule } from '@agm/core';



//// Servicios Internos
import { AuthService } from './services/firebase/auth.service';
import {SqlserviceService} from './services/sql/sqlservice.service';
import {FiredatabaseService} from './services/firebase/firedatabase.service';
import {MensajesService} from './services/mensajes/mensajes.service';
import {CloudMessagingService} from './services/cloud_messagin/cloud-messaging.service';
import {AutorizacionesService} from './services/autorizaciones/autorizaciones.service';

//// Componentes Internos
import { HeaderComponent } from './header/header.component';
import { ClientesListComponent } from './clientes/clientes-list/clientes-list.component';
import { ClientesCrearComponent } from './clientes/clientes-crear/clientes-crear.component';
import { LogMailComponent } from './log/log-mail/log-mail.component';
import { LogGoogleComponent } from './log/log-google/log-google.component';
import { RegistrarseComponent } from './log/registrarse/registrarse.component';
import { FooterComponent } from './footer/footer.component';
import { NuevoUsuarioComponent } from './admin/users/nuevo-usuario/nuevo-usuario.component';
import { UsuarioListComponent } from './admin/users/usuario-list/usuario-list.component';
import { NgbdModalConfirm } from './admin/users/usuario-list/usuario-list.component';
import { UsuarioModificarComponent } from './admin/users/usuario-modificar/usuario-modificar.component';
import { ModalMensajeComponent } from './services/modal-mensaje/modal-mensaje.component';
import { PedidosComponent } from './pedidos/pedidos-listado/pedidos.component';
import { PedidoDetalleComponent } from './pedidos/pedido-detalle/pedido-detalle.component';
import { SpinnerComponent } from './util/spinner/spinner.component';
import { SetingsComponent } from './admin/users/setings/setings.component';
import { AvisosListComponent } from './avisos/avisos-list/avisos-list.component';
import { AvisosNuevoComponent } from './avisos/avisos-nuevo/avisos-nuevo.component';
import { UsuarioNoautorizadoComponent } from './admin/users/usuario-noautorizado/usuario-noautorizado.component';
import { PedidosCreadosListadoComponent } from './pedidos/pedidos-creados-listado/pedidos-creados-listado.component';
import { PedidoCreadoDetalleComponent } from './pedidos/pedido-creado-detalle/pedido-creado-detalle.component';
import { RemitosListadoComponent } from './remitos/remitos-listado/remitos-listado.component';
import { EmpresaModalComponent } from './admin/users/empresa-modal/empresa-modal.component';
import { MapaComponent } from './mapa/mapa.component';
import { AlertasReposicionCrearComponent } from './alertasReposicion/alertas-reposicion-crear/alertas-reposicion-crear.component';
import { AlertasReposicionListadoComponent } from './alertasReposicion/alertas-reposicion-listado/alertas-reposicion-listado.component';
import { RemitosDetalleComponent } from './remitos/remitos-detalle/remitos-detalle.component';

import { EstablecimientosCrearComponent } from './establecimientos/establecimientos-crear/establecimientos-crear.component';
import { EstablecimientosListadoComponent } from './establecimientos/establecimientos-listado/establecimientos-listado.component';
import { RodeoCrearComponent } from './rodeos/rodeo-crear/rodeo-crear.component';
import { RodeosListadoComponent } from './rodeos/rodeos-listado/rodeos-listado.component';
import { RodeosDetalleComponent } from './rodeos/rodeos-detalle/rodeos-detalle.component';
import { RodeosHistorialComponent } from './rodeos/rodeos-historial/rodeos-historial.component';




@NgModule({
  declarations: [
    AppComponent,


    HeaderComponent,
    ClientesListComponent,
    ClientesCrearComponent,
    LogMailComponent,
    LogGoogleComponent,
    RegistrarseComponent,
    FooterComponent,
    NuevoUsuarioComponent,
    UsuarioListComponent,
    UsuarioModificarComponent,
    ModalMensajeComponent,
    NgbdModalConfirm,
    PedidosComponent,
    PedidoDetalleComponent,
    SpinnerComponent,
    SetingsComponent,
    AvisosListComponent,
    AvisosNuevoComponent,
    UsuarioNoautorizadoComponent,
    PedidosCreadosListadoComponent,
    PedidoCreadoDetalleComponent,
    RemitosListadoComponent,
    EmpresaModalComponent,
    MapaComponent,
    AlertasReposicionCrearComponent,
    AlertasReposicionListadoComponent,
    RemitosDetalleComponent,

    EstablecimientosCrearComponent,
    EstablecimientosListadoComponent,
    RodeoCrearComponent,
    RodeosListadoComponent,
    RodeosDetalleComponent,
    RodeosHistorialComponent

  ],
  imports: [

    BrowserModule,
    NgbModule,

    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebase),
     AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBM6lk2bK9YIz7NKZSvDJDeefzwmSFTBhU'
    }),
    AngularFireStorageModule,
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    AngularFirestoreModule,
    AngularFireMessagingModule

  ],

 entryComponents: [NgbdModalConfirm,ModalMensajeComponent,EmpresaModalComponent,MapaComponent],


  providers: [AuthService,SqlserviceService,FiredatabaseService,MensajesService,CloudMessagingService,AutorizacionesService],

  bootstrap: [AppComponent]
})
export class AppModule { }
