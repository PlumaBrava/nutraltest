import { Component, OnInit,Input } from '@angular/core';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import {FiredatabaseService} from '../../../services/firebase/firedatabase.service';
import { User } from '../user';
import { MensajesService }  from '../../../services/mensajes/mensajes.service';
import { CloudMessagingService }  from '../../../services/cloud_messagin/cloud-messaging.service';
import { AutorizacionesService }  from '../../../services/autorizaciones/autorizaciones.service';
// import { AuthService } from '../../../services/firebase/auth.service';
// import { AngularFireMessaging } from '@angular/fire/messaging';
import * as firebase from 'firebase';
import { mergeMap } from 'rxjs/operators';
@Component({
  selector: 'app-setings',
  templateUrl: './setings.component.html',
  styleUrls: ['./setings.component.css']
})
export class SetingsComponent implements OnInit {
    formSettings = this.fb.group({
  ventanaVisualizacionPedidos: ['', Validators.required],
  aceptaDescargaSinRepresentante: [false, Validators.required],
  aceptaNotificaciones: [true, Validators.required],

});
componenteHabilitado:boolean=false;
key:string=null;
userData:any=null;
 messaging = firebase.messaging();
  constructor(private fb: FormBuilder,
              private db: FiredatabaseService,
              private mensageService:MensajesService,
              private cms:CloudMessagingService,
              private autorizaciones:AutorizacionesService,
              // public authService:AuthService

              // private afMessaging: AngularFireMessaging
              ) { }
// @Input() set userSelected  (userSelected: User ) {

//     console.log('userSelected = ',userSelected);
//     console.log('authService = ',this.authService);

//     // this.key=userSelected.key;
//   };
  ngOnInit() {

 console.log("settings  start",);

 if(this.autorizaciones.validarAutorizacion("SetingsComponent")){
     console.log("settings  autorizado",);
     this.componenteHabilitado=true;
     this.init();

 }







  }

init(){
    this.mensageService. getPerfil().subscribe(
         user=>{

             console.log("settings  getPerfilUsuarioSeleccionadoObs user resived",user);

             this.key=user.key;
             this.userData=user.data;



             this.formSettings.patchValue({
                 ventanaVisualizacionPedidos: this.userData.settings.ventanaVisualizacionPedidos,
                 aceptaDescargaSinRepresentante: this.userData.settings.aceptaDescargaSinRepresentante,
                 aceptaNotificaciones: this.userData.settings.aceptaNotificaciones,

             });
        });

     this.formSettings.get('aceptaNotificaciones').valueChanges.subscribe(
   value=> {
      console.log('aceptaNotificaciones',value);
   }
);
}


grabarSettings(){

    console.log(this.formSettings.value);

    console.log('formSettings = ',this.formSettings.value);
    console.log('key = ',this.key);


    this.userData['settings']={
        aceptaDescargaSinRepresentante: this.formSettings.value.aceptaDescargaSinRepresentante,
        aceptaNotificaciones: this.formSettings.value.aceptaNotificaciones,
        ventanaVisualizacionPedidos: this.formSettings.value.ventanaVisualizacionPedidos
        };

     this.db.updateUserSettings(this.key,this.userData);


}

aceptaNotificaciones(){
    if(!this.formSettings.value.aceptaNotificaciones){ // va al reves porque se llama cuando cambia
        console.log('acepta');
        this.setTocken();
    }else{
        console.log('no acepta');
        this.resetTocken();
    }
}


setTocken(){
this.cms.getPermission();
}

resetTocken(){
this.cms.quitPermission();
}

// Mensajes Notificaciones

// requestPermission() {
//  // this. messaging.usePublicVapidKey("BIxlf1s-EtDnjfEZTz6vD_pmddM-2ZUPRyo7Vjnt0dAVE1ComvSrmc95F62AnVzEePAlicnxvzGHJNIC-wfLpfA");
//     this.afMessaging.requestToken
//       .subscribe(
//         (token) => { console.log('Permission granted! Save to the server!', token); },
//         (error) => { console.error(error); },
//       );
//   }


 //   requestPermission(userId) {
 //    this.afMessaging.requestToken.subscribe(
 //      (token) => {
 //        console.log(token);
 //       // this.db. updateToken(this.key,token);
 //       this.db. updateToken("JJ",token);
 //        // this.updateToken(userId, token);
 //      },
 //      (err) => {
 //        console.error('Unable to get permission to notify.', err);
 //      }
 //    );
 //  }




 // // requestPermission() {
 // //     console.log(this.messaging);
 // //    this. messaging.usePublicVapidKey("BIxlf1s-EtDnjfEZTz6vD_pmddM-2ZUPRyo7Vjnt0dAVE1ComvSrmc95F62AnVzEePAlicnxvzGHJNIC-wfLpfA");
 // //      this.messaging.requestPermission()
 // //      .then(() => {
 // //        console.log('Notification permission granted.');
 // //        return this.messaging.getToken() })
 // //      //   this.afMessaging.requestToken.subscribe(
 // //      //   (token) => { console.log('Permission granted! Save to the server!', token); },
 // //      //   (error) => { console.error(error); },
 // //      // );
 // //      // })
 // //      .then(token => {
 // //        console.log(token)
 // //        // this.updateToken(token)
 // //      })
 // //      .catch((err) => {
 // //        console.log('Unable to get permission to notify.', err);
 // //      });
 // //    }


 //  deleteToken() {
 //    this.afMessaging.getToken
 //      .pipe(mergeMap(token => this.afMessaging.deleteToken(token)))
 //      .subscribe(
 //        (token) => { console.log('Deleted!'); },
 //      );
 //  }

 //  listen() {
 //    this.afMessaging.messages
 //      .subscribe((message) => { console.log(message); });
 //  }
}
