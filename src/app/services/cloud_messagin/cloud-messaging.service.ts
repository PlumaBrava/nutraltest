import { Injectable }          from '@angular/core'
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireAuth }     from '@angular/fire/auth';
import * as firebase from 'firebase';
import { MensajesService }  from '../../services/mensajes/mensajes.service';
import { AuthService } from '../../services/firebase/auth.service';
import {FiredatabaseService} from '../../services/firebase/firedatabase.service';

// import 'rxjs/add/operator/take';
import { BehaviorSubject } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class CloudMessagingService {
    messaging = firebase.messaging()
    currentMessage = new BehaviorSubject(null)

constructor(
            // private db: AngularFireDatabase,
            // private afAuth: AngularFireAuth,
            private mensageService:MensajesService,
            private authService:AuthService,
            private firebaseService: FiredatabaseService,

      ) { console.log('CloudMessagingService'); }





  updateToken(token) {
    // this.afAuth.authState.subscribe(user => {
        console.log('CloudMessagingService UpdateToken');
    //   if (!user) return;

    //   const data = { [user.uid]: token }
    //   this.db.object('fcmTokens/').update(data)
    // });
    // this.mensageService.getPerfilUsuarioObs().subscribe(perfilUsuario=>{
    this.mensageService.getPerfilUsuarioSeleccionadoObs().subscribe(perfilUsuario=>{
        console.log('CloudMessagingService  UpdateToken perfilUsuario', perfilUsuario)
        if(perfilUsuario){
       this.firebaseService.updateToken(perfilUsuario,token )

        }
    });
  }

  getPermission() {
      this.messaging.requestPermission()
      .then(() => {
        console.log('CloudMessagingService Notification permission granted.');
        return this.messaging.getToken()
      })
      .then(token => {
        console.log('CloudMessagingService token',token)
        this.updateToken(token);
        this. receiveMessage();
      })
      .catch((err) => {
        console.log( 'CloudMessagingService  Unable to get permission to notify.', err);
      });
    }

    receiveMessage() {
       this.messaging.onMessage((payload) => {
        console.log("CloudMessagingService Message received. ", payload);
        this.currentMessage.next(payload)
      });

    }

    quitPermission(){

      this.messaging.getToken().then(token => {
               console.log('CloudMessagingService quitPermission token',token)
               if(token){
                    this.messaging.deleteToken(token).then(result => {
                        console.log('CloudMessagingService quitPermission delete  result',result);
                        this.mensageService.getPerfilUsuarioSeleccionadoObs().subscribe(perfilUsuario=>{
                            console.log('CloudMessagingService  UpdateToken perfilUsuario', perfilUsuario)
                                if(perfilUsuario){
                                   this.firebaseService.updateToken(perfilUsuario,null )

                                    }
                             })
                    }).catch((err) => {
                                    console.log( 'CloudMessagingService quitPermission delete error.', err);
                          });
                } else{
                       console.log('tocken null');
                }
             }).catch((err) => {
                console.log( 'CloudMessagingService  quitPermission getToken err.', err);
          });


    }
}