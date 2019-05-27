import { Injectable } from '@angular/core';
import { AngularFireDatabaseModule, AngularFireDatabase  } from '@angular/fire/database';
// import {  FirebaseListObservable } from '@angular/fire/database-deprecated';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from "@angular/router";
import * as firebase from 'firebase';
import { AuthService } from '../../services/firebase/auth.service';

import { AngularFirestore, AngularFirestoreDocument ,AngularFirestoreCollection } from '@angular/fire/firestore';

import { Observable, of } from 'rxjs';
// import { User } from '../../admin/users/user';

// export interface UserInterfase {User }


@Injectable({
  providedIn: 'root'
})
export class FiredatabaseService {
// items: Observable<any[]>;
refUsersLogistica = firebase.firestore().collection('Users-Logistica');
refProductosPedidos = firebase.firestore().collection('Productos-Pedidos');
refPedidosWeb = firebase.firestore().collection('PedidosWeb');
refPedidosWebClientes = firebase.firestore().collection('PedidosWebClientes');
refAlertasReposicion = firebase.firestore().collection('Alertas-reposicion');
reffcmTokens = firebase.firestore().collection('fcmTokens');

  constructor(  private db: AngularFireDatabase,public authService:AuthService, private  fs: AngularFirestore
   // private userCollection: AngularFirestoreCollection<User>


   ) {
// this.items = fs.collection('Users-Logistica').valueChanges();
// this.items.subscribe(data=>{console.log('fs',data);})

  }


 updateUserData(key:string,email:string,perfil:string,estado:string,listaEmpresas:string[],settings:any ): void {
  // Writes user name and email to realtime db
  // useful if your app displays information about users or for admin features
    console.log('updateUserData');
    console.log('updateUserData',this.authService.authState);
    console.log('updateUserData settings',settings);
    // const cleanEmail = this.authService.authState.email.replace(/\./g, ',');
    const cleanEmail = email.replace(/\./g, ',');
    const path = `users/${cleanEmail}`; // Endpoint on firebase
    console.log(path);

    // Se definen los valores default de settings
    let settingsData=     {aceptaDescargaSinRepresentante: false,
            aceptaNotificaciones: false,
            ventanaVisualizacionPedidos: 30};

    // Si existen datos de settings se usan esos valores, de lo contrario queda los valores default
    if(settings){ settingsData=settings;
      console.log('Entra en settings', settingsData);
      }
   console.log('settings ', settingsData);
    let data:any;
              if(listaEmpresas==null){ // si la lista de empresas es nula no grabo el dato para que firebase no de error
                      data = {
                      operador: this.authService.authState.email,
                      email:email,
                      perfil: perfil,
                      estado:estado,
                      settings:settingsData,
                      timeStamp:this.timestamp()
                }
              } else{

                     data = {
                      operador: this.authService.authState.email,
                      email:email,
                      perfil: perfil,
                      empresas:listaEmpresas,
                      estado:estado,
                      settings:settings,
                      timeStamp:this.timestamp()
                    }


                }

console.log("key",key);

        if(key){
console.log("update data",data);
          this.updateUser(key,data)
                .subscribe(res => {
                  // let id = res['key'];
                  console.log("res a",res);
                  }, (err) => {
                    console.log("res b",err);
                  console.log(err);
                    });

        } else{
console.log("new data",data);
            this.postUser(data)
                .subscribe(res => {
                  let id = res['key'];
                  console.log(res);
                  }, (err) => {
                  console.log(err);
                    });
       }

  }





/// Firebase Server Timestamp
get timestamp() {
  return firebase.firestore.FieldValue.serverTimestamp;

}

/// Lista los usuarios de la aplicacion. Es una funcionalidad del administrador
getUsers(): Observable<any> {
  console.log('getUser');
  return new Observable((observer) => {
    this.refUsersLogistica.onSnapshot((querySnapshot) => {
      let listaUsuarios = [];
      querySnapshot.forEach((doc) => {
        let data = doc.data();
        listaUsuarios.push({

          key: doc.id,
          email: data.email,
          empresas: data.empresas,
          estado: data.estado,
          operador: data.operador,
          perfil: data.perfil,
          settings:data.settings,
          timeStamp: data.timeStamp
        });
      });
       console.log('getUser',listaUsuarios);
      observer.next(listaUsuarios);
    });
  });
}


/// Crea un nuevo usuario. Es una funcionalidad del administrador
postUser(data): Observable<any> {
  return new Observable((observer) => {
    this.refUsersLogistica.add(data).then((doc) => {
      observer.next({
        key: doc.id,
      });
    });
  });
}

/// Actualiza los datos del ususario. Es una funcionalidad del administrador

updateUser(id: string, data): Observable<any> {
  return new Observable((observer) => {
    this.refUsersLogistica.doc(id).set(data).then(() => {
      observer.next();
    });
  });
}

/// Lista los usuarios de la aplicacion. Es una funcionalidad del administrador, Clientes y distribuidor para
// configurar datos del comportamiento de la aplicacion
// Si quiere recibir mensajes, la cantidad de dias de antguedad que se retornan en pedidos y remitos.

// updateUserSettings(id: string, data): Observable<any> {
updateUserSettings(id: string, data): void {
  console.log('updateUserSettings');
  console.log('updateUserSettings id: ', id);
  console.log('updateUserSettings data',data );
  // return new Observable((observer) => {
    this.refUsersLogistica.doc(id).set(data).then((Response) => {
      console.log('updateUserSettings Response ',Response);
      // observer.next();
    }).catch((error)=>
    {console.log("updateUserSettings",error);}
    );
  // });
}

updateUserEmpresaSelected(id: string, codEmpresa): void {
  console.log('updateUserSettings');
  console.log('updateUserSettings id: ', id);
  console.log('updateUserSettings codEmpresa',codEmpresa );
  // return new Observable((observer) => {


    this.refUsersLogistica.doc(id).set({EmpresaSelected: codEmpresa},{merge: true}).then((Response) => {
      console.log('updateUserSettings Response ',Response);
      // observer.next();
    }).catch((error)=>
    {console.log("updateUserSettings",error);}
    );
  // });
}

getUsersFilterMail(filtroMail): Observable<any> {
  console.log('getUsersFilterMail');
  return new Observable((observer) => {
    this.refUsersLogistica.
    orderBy('email').startAt(filtroMail).endAt(filtroMail+'\uf8ff').onSnapshot((querySnapshot) => {
      let listaUsuarios = [];
      querySnapshot.forEach((doc) => {
        let data = doc.data();
        listaUsuarios.push({

          key: doc.id,
          email: data.email,
          empresas: data.empresas,
          estado: data.estado,
          operador: data.operador,
          perfil: data.perfil,
          timeStamp: data.timeStamp
        });
      });
       console.log('getUsersFilterMail',listaUsuarios);
      observer.next(listaUsuarios);
    });
  });
}

validatUserMailExist(email): Observable<boolean>  {
  console.log('getUsersMailExist');
return new Observable((observer) => {
    this.refUsersLogistica.where('email','==',email).onSnapshot((querySnapshot) => {
console.log('validatUserMailExist querySnapshot.empty',querySnapshot.empty);
console.log('validatUserMailExist querySnapshot.size',querySnapshot.size);

      if(querySnapshot.empty){
         console.log('validatUserMailExist el ususario no existe');
        observer.next( false);  // el ususario no existe
      } else {
        console.log('validatUserMailExist el ususario  existe');
         observer.next( true);  // el ususario  existe
      }
    }, Error=>{
      console.log('validatUserMailExist Error',Error);
     observer.next( false);;
    });

});

  };



/// Almacena los productos que se reciben de los pedidos que pasaron por la aplicacion


// updateUserSettings(id: string, data): Observable<any> {
setProductos( codigoEmpresa: string, codigoProducto: string, descripcion:string, descripcionAdicional:string , unidadMedStock:string   ): void {
  console.log('setProductos');

  console.log('setProductos codigoEmpresa',codigoEmpresa );
  console.log('setProductos codigoProducot',codigoProducto );
  console.log('setProductos descripcion',descripcion );
  console.log('setProductos descripcionAdicional',descripcionAdicional );
  console.log('setProductos unidadMedStock',unidadMedStock );


  // return new Observable((observer) => {

    let producto={};
    producto[codigoProducto]={
        COD_ARTICU:codigoProducto,
        DESCRIPCIO:descripcion,
        DESC_ADIC:descripcionAdicional,
        ID_MEDIDA_STOCK:unidadMedStock
        };
    this.refProductosPedidos.doc(codigoEmpresa).set(producto,{merge: true}).then((Response) => {
      console.log('setProductos Response ',Response);
      // observer.next();
    }).catch((error)=>
    {console.log("setProductos",error);}
    );
  // });
}

/// Retorna los productos que se reciben de los pedidos que pasaron por la aplicacion
getProductos(codigoEmpresa: string   ): Observable<any> {
  console.log('getProductos');
  return new Observable((observer) => {
     let listaProductos=[];
     this.refProductosPedidos.doc(codigoEmpresa).get()
    .then(doc => {

      console.log("getProductos doc",doc);





        let data = doc.data();

        console.log("getProductos data",data);


        for (let  i in data) {
          listaProductos.push(data[i]);
             // console.log(i);
             // console.log( data[i]);
            }
        // listaProductos.push({

        //   key: doc.id,
        //   DESCRIPCIO:data.DESCRIPCIO,
        //   DESC_ADIC: data.DESC_ADIC,
        //   ID_MEDIDA_STOCK: data.ID_MEDIDA_STOCK
        //   // email: data.email,
        //   // empresas: data.empresas,
        //   // estado: data.estado,
        //   // operador: data.operador,
        //   // perfil: data.perfil,
        //   // settings:data.settings,
        //   // timeStamp: data.timeStamp
        // });
      // });
       console.log('getProductos',listaProductos);
      observer.next({listaProductos});
    });
  });
}



crearPedidoWeb(perfilUsuario: any, empresaSelected: any, items: any   ): void {
  console.log('crearPedidoWeb');
  console.log('crearPedidoWeb perfilUsuario: ', perfilUsuario);
  console.log('crearPedidoWeb codigoEmpresa',empresaSelected);
  console.log('crearPedidoWeb items',items );



const refTotalesPedidosWeb=firebase.firestore().collection('PedidosWeb').doc('totales');

var transaction = firebase.firestore().runTransaction((t) => {

   return t.get(firebase.firestore().collection('PedidosWeb').doc('totales'))
      .then(doc => {
        // Suma uno al Nro de pedidos
        console.log('doc',doc);
        var NroPedido = doc.data().cantidadPedidos + 1;
        t.update(refTotalesPedidosWeb, { cantidadPedidos:NroPedido });

      const refPedido=  this.refPedidosWeb.doc(NroPedido.toString());


      let dataCabecera = {};
            dataCabecera['user'] = perfilUsuario;
            dataCabecera['timeStamp'] = this.timestamp();
            dataCabecera['empresa'] =empresaSelected;

      let documento={COD_CLIENT:empresaSelected.COD_CLIENT,
                     estado : 'creado',
                     cabecera:dataCabecera,
                     detalle:items,
                     nroPedido:NroPedido
                      }

      t.set(refPedido, documento);

      return  Promise.resolve('NroPedido increased to ' + NroPedido);
    }).catch(err => {
        console.log(' failure doc:', err);
        return  Promise.reject('NroPedido err to ' + err);
      });

}).then(result => {
  console.log('Transaction success! ',result);
}).catch(err => {
  console.log('Transaction failure: ', err);
});
}


modificarPedidoWeb(perfilUsuario: any, empresaSelected: any, items: any ,NroPedido  ): void {
  console.log('modificarPedidoWeb');
  console.log('modificarPedidoWeb perfilUsuario: ', perfilUsuario);
  console.log('modificarPedidoWeb codigoEmpresa',empresaSelected);
  console.log('modificarPedidoWeb items',items );
  console.log('modificarPedidoWeb NroPedido',NroPedido );





      const refPedido=  this.refPedidosWeb.doc(NroPedido.toString());

  let dataCabecera = {};
            dataCabecera['user'] = perfilUsuario;
            dataCabecera['timeStamp'] = this.timestamp();
            dataCabecera['empresa'] =empresaSelected;


      let documento={COD_CLIENT:empresaSelected.COD_CLIENT,
                     estado : 'creado',
                     cabecera:dataCabecera,
                     detalle:items,
                     nroPedido:NroPedido
                      }

         refPedido.update(documento).then(result => {
        console.log('Transaction success! ',result);
      }).catch(err => {
  console.log('Transaction failure: ', err);
});
}





/// Retorna los productos que se reciben de los pedidos que pasaron por la aplicacion
getPedidosWeb( codigoEmpresa: string, estado: string  ): Observable<any> {
  console.log('getPedidosWeb');
  return new Observable((observer) => {
     // this.refPedidosWeb.where('COD_CLIENT', '==', codigoEmpresa).orderBy('nroPedido', 'desc').onSnapshot((querySnapshot) => {
     this.refPedidosWeb.where('COD_CLIENT', '==', codigoEmpresa).orderBy('nroPedido', 'desc').onSnapshot((querySnapshot) => {
      let listaPedidos = [];
      console.log("getPedidosWeb querySnapshot",querySnapshot);
      querySnapshot.forEach((doc) => {
        let data = doc.data();
        console.log("getPedidosWeb",doc);
        console.log("getPedidosWeb data",data);
        console.log("getPedidosWeb doc.id",doc.id);
        console.log("getPedidosWeb data.cabecera",data.cabecera);
        console.log("getPedidosWeb data.detalle",data.detalle);
        listaPedidos.push({

              NRO_PEDIDO: doc.id,
              estado : data.estado,
              cabecera:data.cabecera,
              detalle:data.detalle
         });
      });
      console.log('getPedidosWeb',listaPedidos);
      observer.next(listaPedidos);
    });
  });
}



crearAlerta(perfilUsuario: any, empresaSelected: any, alerta: any   ): void {
  console.log('crearAlerta');
  console.log('crearAlerta perfilUsuario: ', perfilUsuario);
  console.log('crearAlerta codigoEmpresa',empresaSelected);
  console.log('crearAlerta alerta',alerta );

  const COD_CLIENT=empresaSelected.COD_CLIENT;

  const refAlerta  =this.refAlertasReposicion.doc(COD_CLIENT);



var transaction = firebase.firestore().runTransaction((t) => {



  let documento={COD_CLIENT:empresaSelected.COD_CLIENT,
                 empresa:empresaSelected,
                 };



      return  t.get(refAlerta).then(doc => {

        console.log('doc',doc);
          alerta['estado']= 'activo';
          alerta['timeStamp'] = new Date();

          if (!doc.data()) {
                const listaAlertas=[alerta];
                documento['listaAlertas']=listaAlertas;
                t.set(refAlerta,documento);
            } else {
                const listaAlertas = doc.data().listaAlertas;
                listaAlertas.push(alerta);
                t.update(refAlerta, { listaAlertas: listaAlertas });
            }

        return  Promise.resolve('listaAlertas increased to ' );
          }).catch(err => {
        console.log(' failure doc:', err);
        return  Promise.reject('NroPedido err to ' + err);

      });

    }).then(result => {
      console.log('crearAlerta success! ',result);
      }).catch(err => {
    console.log('crearAlerta failure: ', err);
   });
 };



modificarAlerta(perfilUsuario: any, empresaSelected: any, alerta: any ,idAlerta:number   ): void {
  console.log('modificarAlerta');
  console.log('modificarAlerta perfilUsuario: ', perfilUsuario);
  console.log('modificarAlerta codigoEmpresa',empresaSelected);
  console.log('modificarAlerta alerta',alerta );

  const COD_CLIENT=empresaSelected.COD_CLIENT;

  const refAlerta  =this.refAlertasReposicion.doc(COD_CLIENT);



var transaction = firebase.firestore().runTransaction((t) => {



  let documento={COD_CLIENT:empresaSelected.COD_CLIENT,
                 empresa:empresaSelected,
                 };



      return  t.get(refAlerta).then(doc => {

        console.log('doc',doc);
          alerta['estado']= 'activo';
          alerta['timeStamp'] = new Date();

          if (!doc.data()) {
                //Error no hago nadao

            } else {
                const listaAlertas = doc.data().listaAlertas;
                listaAlertas[idAlerta]=alerta;
                t.update(refAlerta, { listaAlertas: listaAlertas });
            }

        return  Promise.resolve('listaAlertas increased to ' );
          }).catch(err => {
        console.log(' failure doc:', err);
        return  Promise.reject('NroPedido err to ' + err);

      });

    }).then(result => {
      console.log('crearAlerta success! ',result);
      }).catch(err => {
    console.log('crearAlerta failure: ', err);
   });
 };





/// Retorna los productos que se reciben de los pedidos que pasaron por la aplicacion
getAlertas( codigoEmpresa: string, estado: string  ): Observable<any> {
  console.log('getAlertas');

  return new Observable((observer) => {
      let listaAlertas = [];
       this.refAlertasReposicion.doc(codigoEmpresa).get()
          .then(doc => {
          console.log("getAlertas doc",doc);
          let data = doc.data();
          data.listaAlertas.forEach((alerta) => {
          listaAlertas.push(alerta);
       });

      console.log('getAlertas',listaAlertas);
      observer.next(listaAlertas);
    });
  });
}


 // updateToken(userKey: string, token: string  ) {
 //    // we can change this function to request our backend service

 //        const data = {};
 //        data[userKey] = token;

 //      const batch = firebase.firestore().batch();
 //           // this.reffcmTokens.doc(userKey+"/"+codigoEmpresa+"/"+codigoProducto)
 //    this.reffcmTokens.doc(userKey)
 //    .set(
 //      {
 //        token:token,
 //        // DESC_ADIC:descripcionAdicional,
 //        // ID_MEDIDA_STOCK:unidadMedStock
 //       }).then((Response) => {
 //      console.log('updateToken Response ',Response);
 //      // observer.next();
 //    }).catch((error)=>
 //    {console.log("updateToken",error);}
 //    );



 //  }


 updateToken(perfilUser: any, token: string  ) {

    const batch = firebase.firestore().batch();
    // Graba el token para el ususario
    // fcmToken-userKey-token-el valor asignado
    batch.set(this.reffcmTokens.doc(perfilUser.key), { token:token},{merge: true});
    //  Graba el token para cada una de las empresas asignadas al usuario.
   // fcmTokenEmpresas-COD_CLIENT-userKey-el valor asignado al Token
    for(const empresa of perfilUser.data.empresas) {
            const data = {};
            data[perfilUser.key] = token;
            const keyRef=  firebase.firestore().collection('fcmTokensEmpresas').doc(empresa.COD_CLIENT);
            batch.set(keyRef, data,{merge: true});
    };
    batch.commit().then((Response) => {
      console.log('updateToken Response ',Response);

    }).catch((error)=>
    {console.log("updateToken",error);}
    );
    }

}


