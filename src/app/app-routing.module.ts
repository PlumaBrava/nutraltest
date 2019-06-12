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
import { PedidoDetalleComponent } from '../app/pedidos/pedido-detalle/pedido-detalle.component';
import { PedidosCreadosListadoComponent } from '../app/pedidos/pedidos-creados-listado/pedidos-creados-listado.component';
import { PedidoCreadoDetalleComponent } from '../app/pedidos/pedido-creado-detalle/pedido-creado-detalle.component';
import { AlertasReposicionCrearComponent } from './alertasReposicion/alertas-reposicion-crear/alertas-reposicion-crear.component';
import { AlertasReposicionListadoComponent } from './alertasReposicion/alertas-reposicion-listado/alertas-reposicion-listado.component';

import { AvisosListComponent } from '../app/avisos/avisos-list/avisos-list.component';
import { AvisosNuevoComponent } from '../app/avisos/avisos-nuevo/avisos-nuevo.component';

//Plantillas
import { LoginComponent } from '../app/plantillas/login/login.component';
import { EstilosComponent } from '../app/plantillas/estilos/estilos.component';

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
  ,{ path: 'alertaReposicionCrear', component: AlertasReposicionCrearComponent }
  ,{ path: 'alertaReposicionListado', component: AlertasReposicionListadoComponent }
  //Plantillas
  ,{ path: 'login', component: LoginComponent }
  ,{ path: 'estilos', component: EstilosComponent }

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
