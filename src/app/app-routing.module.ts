import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

//Modulos internos
import { ClientesListComponent } from '../app/clientes/clientes-list/clientes-list.component';
import { ClientesCrearComponent } from '../app/clientes/clientes-crear/clientes-crear.component';
import { LogGoogleComponent } from '../app/log/log-google/log-google.component';
import { LogMailComponent } from '../app/log/log-mail/log-mail.component';
import { RegistrarseComponent } from '../app/log/registrarse/registrarse.component';
import { UsuarioListComponent } from '../app/admin/users/usuario-list/usuario-list.component';

// Rutas

const routes: Routes = [
{ path: '', redirectTo: '/', pathMatch: 'full' }
  ,{ path: 'clientesList', component: ClientesListComponent }
  ,{ path: 'clienteCrear/:id', component: ClientesCrearComponent }
  ,{ path: 'logGoogle', component: LogGoogleComponent }
  ,{ path: 'LogMail', component: LogMailComponent }
  ,{ path: 'registrarse', component: RegistrarseComponent }
  ,{ path: 'usuariosList', component: UsuarioListComponent }

];


@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }