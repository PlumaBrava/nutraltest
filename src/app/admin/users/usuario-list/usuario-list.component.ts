import { Component, OnInit } from '@angular/core';
import { AngularFireDatabaseModule, AngularFireDatabase  } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { MensajesService }  from '../../../services/mensajes/mensajes.service';

import { User } from '../user'


@Component({
  selector: 'app-usuario-list',
  templateUrl: './usuario-list.component.html',
  styleUrls: ['./usuario-list.component.css']
})
export class UsuarioListComponent implements OnInit {
  userSelected:User=new User();
  listaUsuarios: Observable<any[]>;

  constructor(db: AngularFireDatabase,
      private mensageService:MensajesService,) {
      this.listaUsuarios = db.list('users').valueChanges();
      console.log( this.listaUsuarios);

  }

  ngOnInit() {
  }

  setUserSelected(userSelected:User){
      console.log(this.userSelected);
    this.userSelected=userSelected;
    this.mensageService.setUserObs(userSelected);
    console.log(this.userSelected);
  }

}
