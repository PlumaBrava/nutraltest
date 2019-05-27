import * as functions from 'firebase-functions';
const admin = require('firebase-admin');
admin.initializeApp();
const sql = require('mssql'); // libreria de MS SQL

// let pool:any=null;           // tiene el pull de conexiones para la base de datos.
const config = {       // Datos de la base
    user: 'Axoft',
    password: 'Axoft',
    // server: 'localhost', // You can use 'localhost\\instance' to connect to named instance
    // server: '192.168.0.23', // You can use 'localhost\\instance' to connect to named instance
    server: '186.38.122.121', // You can use 'localhost\\instance' to connect to named instance
    port:1433,
    database: 'NUTRALMIX_APP',

        options: {
            encrypt: false // Use this if you're on Windows Azure
        }
    };


const axios = require('axios');
const cors = require('cors')({origin: true});
// const https = require('https');
// datos de par aacceder a la api de Infotrak
const usuario = 'nutralmix';
const password = '159';
const id = 3967;
const desde = '2018-08-01 01:00:00';
const hasta = '2018-10-18 00:00:00';


// https://us-central1-nutraltest.cloudfunctions.net/sql_getDetallePedido?Id_Pedido=6611
// https://us-central1-nutraltest.cloudfunctions.net/sql_getDatosEmpresa?Clientes=%2706MA01%27,%2701HU01%27,%2701VA03%27  //van los codifocs de clientes separados por comas y entre''
// https://us-central1-nutraltest.cloudfunctions.net/sql_getPedidos?Codigo_Cliente=06MA01&cantidadDias=360 //el codigo de clientes  no lleva ''

export const sql_get2 = functions.https.onRequest((request, response) => {

    response.setHeader('Access-Control-Allow-Origin', '*');
    response.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
    // res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,contenttype'); // If needed
    response.setHeader('Access-Control-Allow-Credentials', 'true'); // If needed


    sql.connect(config).then((pool1:any) => {
        console.log("sql_get2");
        console.log(pool1);

       pool1.request().execute('APP_Parametros')
       .then((result:any) => {
            console.dir('result',result)

            response.json(result.recordset);  // Always emitted as the last one
            sql.close();
        })
       .catch((err:any) => {
           console.log('err',err);
         // 417 Expectation Failed
           response.status(417).send(err);
           // response.json({'err':err});  // Always emitted as the last one
           sql.close();
        });
    });

    sql.on('error', (err2:any) => {
     response.json({'errsql':err2});  // Always emitted as the last one

    })


});


exports.sql_getDatosEmpresa = functions.https.onRequest((request, response) => {

    response.setHeader('Access-Control-Allow-Origin', '*');
    response.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
    // res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,contenttype'); // If needed
    response.setHeader('Access-Control-Allow-Credentials', 'true'); // If needed


    const Clientes=request.query.Clientes;


    sql.connect(config).then((pool1:any) => {
        console.log("sql_getDatosEmpresa");
        console.log(pool1);




       pool1.request()
       .input('Clientes', sql.VarChar(6), Clientes)
       .execute('APP_GetDatosEmpresa')
       .then((result:any) => {
            // console.dir(result)
            // response.send(result);  // Always emitted as the last one
            // .type('application / json')
             console.log('result json',result);
            response.status(200).type('application/json').send(result.recordset);
            sql.close();
        })
       .catch((err:any) => {
             console.log('err',err);
           response.json(err);  // Always emitted as the last one
           sql.close();
        });
    });

    sql.on('error', (err2:any) => {
     response.json({'errsql':err2});  // Always emitted as the last one

    })

 // response.send("Hello from Firebase!");
});

exports.sql_getDatosEmpresaPorRazonSocial = functions.https.onRequest((request, response) => {

    response.setHeader('Access-Control-Allow-Origin', '*');
    response.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
    // res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,contenttype'); // If needed
    response.setHeader('Access-Control-Allow-Credentials', 'true'); // If needed


    const razonsocial=request.query.razonsocial;


    sql.connect(config).then((pool1:any) => {
        console.log("EmpresaPorRS",razonsocial);
        console.log(pool1);




       pool1.request()
       .input('RazonSocial', sql.VarChar(20), razonsocial)
       .execute('APP_GetDatosEmpresaPorRazonSocial')
       .then((result:any) => {
            // console.dir(result)
            // response.send(result);  // Always emitted as the last one
            // .type('application / json')
             console.log('result json',result);
            response.status(200).type('application/json').send(result.recordset);
            sql.close();
        })
       .catch((err:any) => {
             console.log('err',err);
           response.json(err);  // Always emitted as the last one
           sql.close();
        });
    });

    sql.on('error', (err2:any) => {
     response.json({'errsql':err2});  // Always emitted as the last one

    })

});

export const sql_getPedidoDetallado = functions.https.onRequest((request, response) => {

    response.setHeader('Access-Control-Allow-Origin', '*');
    response.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
    // res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,contenttype'); // If needed
    response.setHeader('Access-Control-Allow-Credentials', 'true'); // If needed


    const COD_CLIENT=request.query.Codigo_Cliente;
    const cantDias=request.query.cantidadDias;
        console.log("COD_CLIENT",COD_CLIENT);
        console.log("cantDias",cantDias);

    sql.connect(config).then((pool1:any) => {
        console.log("sql_getPedidos");
        console.log(pool1);




       pool1.request()
       .input('COD_CLIENT', sql.VarChar(6), COD_CLIENT)
       .input('cantDias', sql.Int, +cantDias) // el + lo transoforma en numero
       .execute('APP_GetPedidoDetallado')
       .then((result:any) => {
            console.dir("result",result)
            response.json(result.recordset);  // Always emitted as the last one
            sql.close();
        })
       .catch((err:any) => {
         console.dir("err", err)
           response.json(err);  // Always emitted as the last one
           sql.close();
        });
    });

    sql.on('error', (err2:any) => {
       console.dir("err2", err2)
     response.json({'errsql':err2});  // Always emitted as the last one

    })

 // response.send("Hello from Firebase!");
});

export const sql_getRemitoDetallado = functions.https.onRequest((request, response) => {

    response.setHeader('Access-Control-Allow-Origin', '*');
    response.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
    // res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,contenttype'); // If needed
    response.setHeader('Access-Control-Allow-Credentials', 'true'); // If needed


    const COD_CLIENT=request.query.Codigo_Cliente;
    const cantDias=request.query.cantidadDias;
        console.log("COD_CLIENT",COD_CLIENT);
        console.log("cantDias",cantDias);

    sql.connect(config).then((pool1:any) => {
        console.log("sql_getPedidos");
        console.log(pool1);




       pool1.request()
       .input('COD_CLIENT', sql.VarChar(6), COD_CLIENT)
       .input('cantDias', sql.Int, +cantDias) // el + lo transoforma en numero
       .execute('APP_GetRemitoDetallado')
       .then((result:any) => {
            console.dir("result",result)
            response.json(result.recordset);  // Always emitted as the last one




            sql.close();
        })
       .catch((err:any) => {
         console.dir("err", err)
           response.json(err);  // Always emitted as the last one
           sql.close();
        });
    });

    sql.on('error', (err2:any) => {
       console.dir("err2", err2)
     response.json({'errsql':err2});  // Always emitted as the last one

    })

 // response.send("Hello from Firebase!");
});

export const sql_getPedidos = functions.https.onRequest((request, response) => {

    response.setHeader('Access-Control-Allow-Origin', '*');
    response.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
    // res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,contenttype'); // If needed
    response.setHeader('Access-Control-Allow-Credentials', 'true'); // If needed


    const COD_CLIENT=request.query.Codigo_Cliente;
    const cantDias=request.query.cantidadDias;
        console.log("COD_CLIENT",COD_CLIENT);
        console.log("cantDias",cantDias);

    sql.connect(config).then((pool1:any) => {
        console.log("sql_getPedidos");
        console.log(pool1);




       pool1.request()
       .input('COD_CLIENT', sql.VarChar(6), COD_CLIENT)
       .input('cantDias', sql.Int, +cantDias) // el + lo transoforma en numero
       .execute('APP_GetPedidos')
       .then((result:any) => {
            console.dir("result",result)
            response.json(result.recordset);  // Always emitted as the last one
            sql.close();
        })
       .catch((err:any) => {
         console.dir("err", err)
           response.json(err);  // Always emitted as the last one
           sql.close();
        });
    });

    sql.on('error', (err2:any) => {
       console.dir("err2", err2)
     response.json({'errsql':err2});  // Always emitted as the last one

    })

 // response.send("Hello from Firebase!");
});

export const sql_getNovedades = functions.https.onRequest((request, response) => {

    response.setHeader('Access-Control-Allow-Origin', '*');
    response.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
    // res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,contenttype'); // If needed
    response.setHeader('Access-Control-Allow-Credentials', 'true'); // If needed


    // const COD_CLIENT=request.query.Codigo_Cliente;
    // const cantDias=request.query.cantidadDias;
        // console.log("COD_CLIENT",COD_CLIENT);
        // console.log("cantDias",cantDias);

    sql.connect(config).then((pool1:any) => {
        console.log("APP_GetNovedades_inicial");
        console.log(pool1);




       pool1.request()
       // .input('COD_CLIENT', sql.VarChar(6), COD_CLIENT)
       // .input('cantDias', sql.Int, +cantDias) // el + lo transoforma en numero
       .execute('APP_GetNovedades_inicial')
       .then((result:any) => {
            console.dir("result",result)
            response.json(result.recordset);  // Always emitted as the last one
            sql.close();
        })
       .catch((err:any) => {
         console.dir("err", err)
           response.json(err);  // Always emitted as the last one
           sql.close();
        });
    });

    sql.on('error', (err2:any) => {
       console.dir("err2", err2)
     response.json({'errsql':err2});  // Always emitted as the last one

    })

 // response.send("Hello from Firebase!");
});

export const sql_getDetallePedido = functions.https.onRequest((request, response) => {

    response.setHeader('Access-Control-Allow-Origin', '*');
    response.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
    // res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,contenttype'); // If needed
    response.setHeader('Access-Control-Allow-Credentials', 'true'); // If needed

    const idPedido=request.query.Id_Pedido;

     console.log("idPedido",idPedido);
    sql.connect(config).then((pool1:any) => {
        console.log("sql_getDetallePedido");
        console.log(pool1);


  console.log("idPedido",idPedido);

       pool1.request()
       .input('Id_Pedido', sql.Int, idPedido)
       .execute('APP_GetDetallePedido')
       .then((result:any) => {
            console.dir(result)
            response.json(result.recordset);  // Always emitted as the last one
            sql.close();
        })
       .catch((err:any) => {
           response.json(err);  // Always emitted as the last one
           sql.close();
        });
    });

    sql.on('error', (err2:any) => {
     response.json(err2);  // Always emitted as the last one

    })

 // response.send("Hello from Firebase!");
});


exports.buscaVehiculos =functions.https.onRequest((req, res) => {
console.log("buscaVehiculos");


  cors(req, res, () => {


  return    axios.post('https://ver.infotrak.com.ar:8144/api/vehiculos',
             {  'Usuario': usuario,
                'Password':password} )
// At request level
// const agent = new https.Agent({
//   rejectUnauthorized: true
// });

// return axios({
//   method: 'post',
//   url:'/api/vehiculos',
//   baseURL: 'https://ver.infotrak.com.ar:8144',

//   data: {
//     'Usuario': 'nutralmix',
//     'Password': 159
//   }
//   ,
//   // headers: {
//   //       'Access-Control-Allow-Origin': '*',
//   //       'Access-Control-Allow-Credentials': true,
//   //       'Access-Control-Allow-Methods': 'POST'
//   //       },
//   //   json: true,
//   //   withCredentials: false,
//     httpsAgent: agent
//     } )

           .then((vehiculos:any)=> {
              console.log("Respuesta ok");
              console.log(vehiculos.data);
            return  res.status(200).send(vehiculos.data);
              // return ("ok");
              })
           .catch((e:any) => {
              console.log("Respuesta error");
              console.log (e);
              res.status(400).send('Error'+ e);
              return ("error");
      });
  });
});


exports.buscaVehiculosHistorico =functions.https.onRequest((req, res) => {
console.log("buscaHistoricos");

  cors(req, res, () => {


axios.post('https://ver.infotrak.com.ar:8144/api/historicos', {
        'Usuario': usuario,
        'Password': password,
        'Id': id,
        'Desde': desde,
        'Hasta': hasta
    })

// axios.all([buscaVehiculos()])
    .then((vehiculos:any)=> {
      console.log(vehiculos.data);
        res.status(200).send(vehiculos.data);
                 return ("ok");
            // console.log('\x1b[35mVehiculos encontrados: ',vehiculos.data.length,'\x1b[30m');
            // if (vehiculos.data.length>5) {
            //     console.log('\x1b[35mMostrando primeras 5\x1b[30m')
            //     console.log(vehiculos.data.slice(0,4));
            //      res.status(200).send({'vehiculos':vehiculos});
            //      return ("ok");
            // }
            // else {
            //   res.status(200).send({'vehiculosMenor':vehiculos});
            //   return ("ok menor5");
            // }

            }
    )
    .catch((e:any) => {
    console.log (e);
    res.status(400).send('Error'+ e);
  });

});
   });
// Always change the value of "/hello" to "world!"
exports.hello = functions.database.ref('/hello').onWrite(
  // event => {
(change, context) => {
  const beforeData = change.before.val(); // data before the write
  const afterData = change.after.val(); // data after the write
  console.log(beforeData);
  console.log(afterData);
// });


  // set() returns a promise. We keep the function alive by returning it.
  return change.after.ref.set('world!').then(() => {
    console.log('Write succeeded!');
  });
});


// Always change the value of "/hello" to "world!"
// exports.mensaje = functions.database.ref('/messages').onWrite(
// /novedades_pedidos/01JA01
// exports.mensaje1 = functions.firestore.document('/novedades_pedidos/{COD_CLIENT}/pedidos/{NRO_PEDIDO}')
exports.mensaje1 = functions.firestore.document('/novedades_pedidos/{COD_CLIENT}')
    .onWrite((change, context) => {

      const beforeData:any = change.after.exists ? change.after.data() : null; // data before the write
      const afterData:any = change.before.data(); // data after the write
      console.log(beforeData);
      console.log(afterData);
      console.log('COD_CLIENT',context.params.COD_CLIENT);
      let NroPedido:string=""
      if (afterData.NRO_PEDIDO !== undefined){
      NroPedido=afterData.NRO_PEDIDO;
      }
      // console.log('NRO_PEDIDO',context.params.NRO_PEDIDO);

    return  admin.firestore().collection('fcmTokensEmpresas').doc(context.params.COD_CLIENT).get()
          .then((doc:any) => {
              if (!doc.exists) {
                console.log('No such document!');
                return null;
              } else {
                 let registrationTokens:string[]=[];
                console.log('Document data:', doc.data());
                const objectKeysArray = Object.keys(doc.data())
                objectKeysArray.forEach(function(objKey) {
                  if(doc.data()[objKey]){ // Si hay un token valido (no nulo) lo sumo a la lista
                        registrationTokens.push(doc.data()[objKey]);
                    }
                  });

             // Notification details.
                 const  message={
                  // tokens: registrationTokens,
                  notification: {
                      title: 'Novedades Nutralmix!',
                      body: 'Pedido Nro: '+NroPedido ,
                      icon: "https://placeimg.com/250/250/people",
                      click_action: "http://www.news-magazine.com/world-week/21659772"
                    } //       ,
                  // data : {
                  //   volume : "3.21.15",
                  //   contents : "http://www.news-magazine.com/world-week/21659772"
                  // }

                };
                  console.log('menssage', message);
                return  admin.messaging().sendToDevice(registrationTokens, message) .then(function(response:any) {
                 // return  admin.messaging().sendMulticast(message).then(function(response:any) {
                     console.log("Successfully sent message:", response);
                  }) .catch(function(error:any) {
                      console.log("Error sending message:", error);
                      });

            }
       }).catch((err:any) => {
          console.log('Error getting document', err);
          return null;
    });




// const tokens="dp2y31j8atc:APA91bFvOiTwrfB9DI8rx3TObmJV8sBuDXaLyiN3QwloFWXCvoQodrZBYEQ62PVNoRiBdHuzUpgV-BgasbjKly3J48FAE3EU4Po4S6JiOnY7oq_Gh_lfO8c2qiFbh0OVuZYOLfcOG7GR";
// Notification details.
  //     const payload = {
  //       notification: {
  //         title: 'You have a new follower!',
  //         body: 'body s now following you.' ,
  //         icon: "https://placeimg.com/250/250/people",
  //         click_action: "http://www.news-magazine.com/world-week/21659772"
  //       }
  // //       ,
  // data : {
  //   volume : "3.21.15",
  //   contents : "http://www.news-magazine.com/world-week/21659772"
  // }
      // };


// admin.messaging().sendToDevice(tokens, payload) .then(function(response:any) {

//             console.log("Successfully sent message:", response);

//         })
//         .catch(function(error:any) {
//             console.log("Error sending message:", error);
//         });

  // set() returns a promise. We keep the function alive by returning it.
  // return change.after.ref.set({
  //       enviado: 'enviado ok'
  //     }, {merge: true}).then(() => {
  //   console.log('Write succeeded!');
  // });





});

exports.checkIP = functions.https.onRequest((req, res) => {
  cors(req, res, () => {
    if (req.method !== "GET") {
      return res.status(401).json({
        message: "Not allowed"
      });
    }

    return axios.get('https://api.ipify.org?format=json')
      .then((response:any) => {
        console.log(response.data);
        return res.status(200).json({
          message: response.data.ip
        })
      })
      .catch((err:any) => {
        return res.status(500).json({
          error: err
        })
      })

  })
});
/**
 * Run once a day at midnight, to cleanup the users
 * Manually run the task here https://console.cloud.google.com/cloudscheduler
 */
// exports.accountcleanup = functions.pubsub.schedule('every day 00:00').onRun(async context => {
// exports.buscaNovedades = functions.pubsub.schedule('1 * * * *').onRun((context) => {
//     console.log('This will be run every 015 min');
// });topic('tareaPeriodica')
exports.scheduledFunctionCrontab =
functions.pubsub.schedule('every 1 minutes').onRun((context) => {
    console.log('This will be run every 1 min!');
    return null;
});

// https://console.cloud.google.com/cloudscheduler?project=nutraltest&jobs-tablesize=50



exports.sql_getNovedadesPedido1 = functions.https.onRequest((request, response) => {

    response.setHeader('Access-Control-Allow-Origin', '*');
    response.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
    // res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,contenttype'); // If needed
    response.setHeader('Access-Control-Allow-Credentials', 'true'); // If needed

    sql.connect(config).then((pool1:any) => {
        console.log("sql_getNovedadesPedido");
        // console.log(pool1);




       pool1.request()
       .execute('APP_GetNovedadesPedidos')
       .then((result:any) => {
          console.log('result json',result.recordset);
          console.log('recordset length',result.recordset.length);
          console.log('recordset ',result.recordset);
        const batch = admin.firestore().batch();
        for(const pedido of result.recordset) {
          const data = { ID: pedido.ID,
                COD_CLIENT: pedido.COD_CLIENT,
                COD_TRANSP: pedido.COD_TRANSP,
                ID_ESTADO: pedido.ID_ESTADO,
                DESCRIPCION:pedido.DESCRIPCION,
                NRO_PEDIDO:pedido.NRO_PEDIDO,
                NRO_REMITO:pedido.NRO_REMITO,
                NOTIFICADO:pedido.NOTIFICADO
                // FECHA_NOTIFICACION: 2019-04-25T15:44:01.690Z,
               };
          console.log('pedido2',data);
       const keyRef=  admin.firestore().collection('novedades_pedidos').doc(pedido.COD_CLIENT);
        batch.set(keyRef, data,{merge: true});
       }


    batch.commit().then(()=> {
      response.status(200).type('application/json').send(result.recordset);
      sql.close();

    });




    }).catch((err:any) => {
        console.log('err',err);
        response.json(err);  // Always emitted as the last one
        sql.close();
      });
    });

    sql.on('error', (err2:any) => {
     response.json({'errsql':err2});  // Always emitted as the last one
    })
});