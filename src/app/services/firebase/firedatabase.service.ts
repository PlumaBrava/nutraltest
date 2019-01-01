import { Injectable } from '@angular/core';
import { AngularFireDatabaseModule, AngularFireDatabase  } from '@angular/fire/database';
// import {  FirebaseListObservable } from '@angular/fire/database-deprecated';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from "@angular/router";
import * as firebase from 'firebase';
import { AuthService } from '../../services/firebase/auth.service';

// import { AngularFirestore, AngularFirestoreDocument ,AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
// import { User } from '../../admin/users/user';

// export interface UserInterfase {User }


@Injectable({
  providedIn: 'root'
})
export class FiredatabaseService {

  constructor(  private db: AngularFireDatabase,public authService:AuthService,
   // private userCollection: AngularFirestoreCollection<User>
   ) { }


 updateUserData(email:string,perfil:string,estado:string,listaEmpresas:string[] ): void {
  // Writes user name and email to realtime db
  // useful if your app displays information about users or for admin features
    console.log('updateUserData');
    console.log('updateUserData',this.authService.authState);
    // const cleanEmail = this.authService.authState.email.replace(/\./g, ',');
    const cleanEmail = email.replace(/\./g, ',');
    const path = `users/${cleanEmail}`; // Endpoint on firebase
    console.log(path);
    let data:any;
              if(listaEmpresas.length<1){ // si la lista de empresas es nula no grabo el dato para que firebase no de error
                      data = {
                      operador: this.authService.authState.email,
                      email:email,
                      perfil: perfil,
                      estado:estado,
                      timeStamp:firebase.database.ServerValue.TIMESTAMP
                }
              } else{

                     data = {
                      operador: this.authService.authState.email,
                      email:email,
                      perfil: perfil,
                      empresas:listaEmpresas,
                      estado:estado,
                      timeStamp:firebase.database.ServerValue.TIMESTAMP
                    }


                }

    this.db.object(path).update(data).catch(error => console.log(error));

    // this.userCollection.add(data).catch(error => console.log(error));
   //  var updateData={
   //    [`perfiles/${cleanEmail}`]: "perfil",
   //    [`fechasIngreso/${cleanEmail}`]: firebase.database.ServerValue.TIMESTAMP

   //    };
   //  console.log(updateData);
   // this.db.object('data').update(updateData);

  }

}
