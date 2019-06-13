import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

//Modulos internos
import { ClientesListComponent } from '../app/clientes/clientes-list/clientes-list.component';
import { ClientesCrearComponent } from '../app/clientes/clientes-crear/clientes-crear.component';
import { LogGoogleComponent } from '../app/log/log-google/log-google.component';
import { LogMailComponent } from '../app/log/log-mail/log-mail.component';
import { SetingsComponent } from '../app/admin/users/setings/setings.component';
import { RegistrarseComponent } from '../app/log/registrarse/registrarse.component';
import { UsuarioListComponent } from '../app/admin/users/usuario-list/usuario-list.component';
import { UsuarioNoautorizadoComponent } from './admin/users/usuario-noautorizado/usuario-noautorizado.component';

import { PedidosComponent } from '../app/pedidos/pedidos-listado/pedidos.component';
import { RemitosListadoComponent } from '../app/remitos/remitos-listado/remitos-listado.component';
import { RemitosDetalleComponent } from '../app/remitos/remitos-detalle/remitos-detalle.component';
import { PedidoDetalleComponent } from '../app/pedidos/pedido-detalle/pedido-detalle.component';
import { PedidosCreadosListadoComponent } from '../app/pedidos/pedidos-creados-listado/pedidos-creados-listado.component';
import { PedidoCreadoDetalleComponent } from '../app/pedidos/pedido-creado-detalle/pedido-creado-detalle.component';
import { AlertasReposicionCrearComponent } from './alertasReposicion/alertas-reposicion-crear/alertas-reposicion-crear.component';
import { AlertasReposicionListadoComponent } from './alertasReposicion/alertas-reposicion-listado/alertas-reposicion-listado.component';

import { AvisosListComponent } from '../app/avisos/avisos-list/avisos-list.component';
import { AvisosNuevoComponent } from '../app/avisos/avisos-nuevo/avisos-nuevo.component';
import { EstablecimientosCrearComponent } from '../app/establecimientos/establecimientos-crear/establecimientos-crear.component';
import { EstablecimientosListadoComponent } from '../app/establecimientos/establecimientos-listado/establecimientos-listado.component';
import { RodeoCrearComponent } from '../app/rodeos/rodeo-crear/rodeo-crear.component';
import { RodeosListadoComponent } from '../app/rodeos/rodeos-listado/rodeos-listado.component';
import { RodeosDetalleComponent } from '../app/rodeos/rodeos-detalle/rodeos-detalle.component';
import { RodeosHistorialComponent } from '../app/rodeos/rodeos-historial/rodeos-historial.component';

// Rutas

const routes: Routes = [

  { path: 'clientesList', component: ClientesListComponent }
  ,{ path: 'clienteCrear/:id', component: ClientesCrearComponent }
  ,{ path: 'logGoogle', component: LogGoogleComponent }
  ,{ path: 'LogMail', component: LogMailComponent }
  ,{ path: 'registrarse', component: RegistrarseComponent }
  ,{ path: 'settings', component: SetingsComponent }
  ,{ path: 'usuariosList', component: UsuarioListComponent }
  ,{ path: 'pedidos', component: PedidosComponent }
  ,{ path: 'pedidosDetalles', component: PedidoDetalleComponent }
  ,{ path: 'pedidosCrearListados', component: PedidosCreadosListadoComponent }
  ,{ path: 'pedidoCrearDetalles', component: PedidoCreadoDetalleComponent }
  ,{ path: 'avisosList', component: AvisosListComponent }
  ,{ path: 'remitos', component: RemitosListadoComponent }
  ,{ path: 'remitosDetalles', component: RemitosDetalleComponent }
  ,{ path: 'alertaReposicionCrear', component: AlertasReposicionCrearComponent }
  ,{ path: 'alertaReposicionListado', component: AlertasReposicionListadoComponent }


  ,{ path: 'establecimientosListado', component: EstablecimientosListadoComponent }
  ,{ path: 'rodeosListado', component: RodeosListadoComponent }

  ,{ path: 'ususario_no_autorizado', component: UsuarioNoautorizadoComponent }

  ,{ path: '', redirectTo: '/clientesList', pathMatch: 'full' } //esto se usa para que funcione cuando no exista la ruta solicitada

  // , { path: '**', component: UsuarioNoautorizadoComponent }

  // ,{ path: 'firebase-messaging-sw.js', component: RegistrarseComponent }

];




@NgModule({
 imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})],
 exports: [RouterModule],
 })

export class AppRoutingModule { }