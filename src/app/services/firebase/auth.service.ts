// referencia
// https://gist.github.com/codediodeio/5e02b605f2ab015f2fb1e60497bd46bf

import { Injectable } from '@angular/core';
// import { AngularFireDatabaseModule, AngularFireDatabase  } from '@angular/fire/database';
// import {  FirebaseListObservable } from '@angular/fire/database-deprecated';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from "@angular/router";
import * as firebase from 'firebase';

import { Observable, of , Observer} from 'rxjs';
import { AngularFirestore, AngularFirestoreDocument ,AngularFirestoreCollection } from '@angular/fire/firestore';
import { MensajesService }  from '../../services/mensajes/mensajes.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authState: any = null;
  PerfildeUsuario: any = null;



  // PerfildeUsuario:  new Observable() ;
  constructor(private afAuth: AngularFireAuth,
              // private db: AngularFireDatabase,
              private  fs: AngularFirestore,
              private mensageService:MensajesService,
              private router:Router) {

                  console.log('authService start');
                  this.afAuth.authState.subscribe((auth) => {
                  // this.authState = auth
                  console.log('auth service', auth);
                  this.updateUserData(auth);
                  });
  }

  // Returns true if user is logged in
  get authenticated(): boolean {
    return this.authState !== null;
  }

  // Returns current user data
  get currentUser(): any {
    return this.authenticated ? this.authState : null;
  }

  // Returns
  get currentUserObservable(): any {
    return this.afAuth.authState
  }

  // Returns current user UID
  get currentUserId(): string {
    return this.authenticated ? this.authState.uid : '';
  }

  // Anonymous User
  get currentUserAnonymous(): boolean {
    return this.authenticated ? this.authState.isAnonymous : false
  }

  // Returns current user display name or Guest
  get currentUserDisplayName(): string {
    if (!this.authState) { return 'Guest' }
    else if (this.currentUserAnonymous) { return 'Anonymous' }
    else if (this.authState['displayName']==null) { return this.authState['email'] }
    else { return this.authState['displayName'] || 'User without a Name' }
  }

  //// Social Auth ////

  githubLogin() {
    const provider = new firebase.auth.GithubAuthProvider()
    return this.socialSignIn(provider);
  }

  googleLogin() {
      console.log('authService googleLogin');
    const provider = new firebase.auth.GoogleAuthProvider()
    return this.socialSignIn(provider);
  }

  facebookLogin() {
    const provider = new firebase.auth.FacebookAuthProvider()
    return this.socialSignIn(provider);
  }

  twitterLogin(){
    const provider = new firebase.auth.TwitterAuthProvider()
    return this.socialSignIn(provider);
  }

  private socialSignIn(provider) {
     console.log('authService socialSignIn');
    return this.afAuth.auth.signInWithPopup(provider)
      .then((credential) =>  {
            console.log('authService signInWithPopup',credential);
          // this.authState = credential.user
          this.updateUserData(credential.user);
           // this.router.navigate(['/'])
      })
      .catch(error => console.log(error));
  }


  //// Anonymous Auth ////

  anonymousLogin() {
    return this.afAuth.auth.signInAnonymously()
    .then((user) => {
      // this.authState = user
      this.updateUserData(user);
       this.router.navigate(['/'])
    })
    .catch(error => console.log(error));
  }

  //// Email/Password Auth ////

  emailSignUp(email:string, password:string) {
    return this.afAuth.auth.createUserWithEmailAndPassword(email, password)
      .then((user) => {
        console.log(user);
        // this.authState = user
        this.updateUserData(user);
         this.router.navigate(['/'])
      })
      .catch(error => console.log(error));

      // code: "auth/email-already-in-use"
// message: "The email address is already in use by another account."
// code: "auth/invalid-email"
// message: "The email address is badly formatted."

  }

  emailLogin(email:string, password:string) {
     return this.afAuth.auth.signInWithEmailAndPassword(email, password)
       .then((user) => {
         console.log(user);
         // this.authState = user.user
         this.updateUserData(user.user)
          // this.router.navigate(['/usuariosList']);
          this.router.navigate(['/']);

       })
       .catch(error => console.log(error)
// code: "auth/wrong-password"
// message: "The password is invalid or the user does not have a password."

// code: "auth/user-not-found"
// message: "There is no user record corresponding to this identifier. The user may have been deleted."

// code: "auth/network-request-failed"
// message: "A network error (such as timeout, interrupted connection or unreachable host) has occurred."

// code: "auth/too-many-requests"
// message: "Too many unsuccessful login attempts.  Please include reCaptcha verification or try again later"

         );
  }

  // Sends email allowing user to reset password
  resetPassword(email: string) {
    var auth = firebase.auth();

    return auth.sendPasswordResetEmail(email)
      .then(() => console.log("email sent"))
      .catch((error) => console.log(error))
  }


  //// Sign Out ////

  signOut(): void {
    console.log('authService signOut');
    this.afAuth.auth.signOut();
    this.PerfildeUsuario=null;
    this.mensageService.setPerfilUsuarioObs(null);
    this.authState=null;
    this.router.navigate(['/'])
  }


  //// Helpers ////

  private updateUserData(auth): void {
     console.log('updateUserData auth',auth);
    if (auth!=null){
    // this.authState = auth
  // Writes user name and email to realtime db
  // useful if your app displays information about users or for admin features
    console.log('updateUserData');
    console.log('updateUserData',this.authState);

    let path = `users/${this.currentUserId}`; // Endpoint on firebase
    console.log(path);
    let data = {
                  email: auth.email,
                  name: auth.displayName
                }
    var cleanEmail = auth.email.replace(/\./g, ',');
   //  this.db.object(path).update(data).catch(error => console.log(error));
   //  var updateData={
   //    [`perfiles/${cleanEmail}`]: "perfil",
   //    [`fechasIngreso/${cleanEmail}`]: firebase.database.ServerValue.TIMESTAMP

   //    };
   //  console.log(updateData);
   // this.db.object('data').update(updateData);




   // this.fs.collection('Users-Logistica',ref => ref.where('email', '==' ,auth.email)).valueChanges().subscribe(datosDeUsuario=>{

    // console.log('updateUserData  collection',datosDeUsuario);}


    // );


// SE SUBSCRIBE a la consulta de firebase del usuario utilizando como clave el email.
// si existe recibe el perfil del usuario.
this.getPefil(auth).subscribe(perfil=>{
  console.log("perfil",perfil);
  this.PerfildeUsuario=perfil;
  // this.mensageService.setPerfilUsuarioObs(perfil[0]);
  this.mensageService.setPerfilUsuarioObs(perfil);
  this.authState = auth
});




//    firebase.firestore().collection('Users-Logistica'). orderBy('email').startAt(auth.email).endAt(auth.email+'\uf8ff').

//     onSnapshot(datosDeUsuario=>{
//        this.authState = auth
//     console.log('updateUserData',datosDeUsuario);
//       if(datosDeUsuario.empty){
//          console.log('updateUserData el ususario no existe');
//         // observer.next( false);  // el ususario no existe
//       } else {
//         // datosDeUsuario.size
//         console.log('updateUserData el datosDeUsuario.size' ,datosDeUsuario.size);

//         this.PerfildeUsuario=  datosDeUsuario.docs[0].data();
//             console.log('updateUserData el datosDeUsuario.docs[0]' ,datosDeUsuario.docs[0].data());
//            console.log('this.esAdministrador' ,this.esAdministrador);
// this.router.navigate(['/'])

//         // this.esUsuarioAutorizado();

//          // observer.next( true);  // el ususario  existe
//       }
//     }, Error=>{
//       console.log('updateUserData Error',Error);
//      // observer.next( false);;
//     });
   }}




// Determina si un usuario tieme perfil Administrador
  get esAdministrador(): boolean {
    return this.PerfildeUsuario!=null && this.PerfildeUsuario.data.perfil=='administrador'? true : false;
  }

// Determina si un usuario tieme perfil Cliente
  get esCliente(): boolean {
    return this.PerfildeUsuario!=null && this.PerfildeUsuario.data.perfil=='cliente'? true : false;
  }

  // Determina si un usuario tieme perfil Distribuidor
  get esDistribuidor(): boolean {
    return this.PerfildeUsuario!=null && this.PerfildeUsuario.data.perfil=='distribuidor'? true : false;
  }

    // Determina si un usuario tieme perfil Distribuidor
  get esTransportista(): boolean {
     return this.PerfildeUsuario!=null && this.PerfildeUsuario.data.perfil=='transportista'? true : false;
  }

  get estaPendiente(): boolean {
    return this.PerfildeUsuario!=null && this.PerfildeUsuario.data.estado=='pendiente'? true : false;
  }

  get estaActivo(): boolean {
    return this.PerfildeUsuario!=null && this.PerfildeUsuario.data.estado=='activo'? true : false;
  }

  get estaSuspendido(): boolean {
    return this.PerfildeUsuario!=null && this.PerfildeUsuario.data.estado=='suspendido'? true : false;
  }

 get getPerfilUsuario(): any {
    return this.PerfildeUsuario;
  }

// Get perfil retorna un observable para que se pueda subscribir
// hace la consulta del Usuario
// cuando recibe la informacion la publica para que el suscriptor la pueda ver

getPefil(auth): Observable<any> {
  console.log('getUser');
  return new Observable((observer) => {

    this.fs.collection('Users-Logistica',ref => ref.where('email', '==' ,auth.email))
    .snapshotChanges()
    // .valueChanges()
    .subscribe(datosDeUsuario=>{

      console.log('getPefil  collection data',datosDeUsuario[0].payload.doc.data());
      console.log('getPefil  collection key',datosDeUsuario[0].payload.doc.id);
     var perf= {'key':datosDeUsuario[0].payload.doc.id,'data':datosDeUsuario[0].payload.doc.data()}
      console.log('getPefil perf  keys',perf);

        observer.next(perf);
        observer.complete();// Para cerrar la susripcion.

     });
  });
}



}
