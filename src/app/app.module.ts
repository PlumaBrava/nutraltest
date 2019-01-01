import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';






//// Componentes Externos


import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { environment } from '../environments/environment';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireDatabaseModule } from '@angular/fire/database';
// import { AngularFirestoreCollection } from '@angular/fire/firestore';

import { AngularFireStorageModule } from '@angular/fire/storage';
import { HttpClientModule,HttpClientXsrfModule } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';


//// Servicios Internos
import { AuthService } from './services/firebase/auth.service';
import {SqlserviceService} from './services/sql/sqlservice.service';
import {FiredatabaseService} from './services/firebase/firedatabase.service';
import {MensajesService} from './services/mensajes/mensajes.service';

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
import { UsuarioModificarComponent } from './admin/users/usuario-modificar/usuario-modificar.component';



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

  ],
  imports: [
    BrowserModule,
    NgbModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireStorageModule,
    AngularFireAuthModule,
    AngularFireDatabaseModule
    // AngularFirestoreCollection

  ],
  providers: [AuthService,SqlserviceService,FiredatabaseService,MensajesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
