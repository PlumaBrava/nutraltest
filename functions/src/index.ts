


import * as functions from 'firebase-functions';
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

var usuario = 'nutralmix';
var password = '159';
var id = 3967;
var desde = '2018-08-01 01:00:00';
var hasta = '2018-10-18 00:00:00';


// https://us-central1-nutraltest.cloudfunctions.net/sql_getDetallePedido?Id_Pedido=6611
// https://us-central1-nutraltest.cloudfunctions.net/sql_getDatosEmpresa?Clientes=%2706MA01%27,%2701HU01%27,%2701VA03%27  //van los codifocs de clientes separados por comas y entre''
// https://us-central1-nutraltest.cloudfunctions.net/sql_getPedidos?Codigo_Cliente=06MA01&cantidadDias=360 //el codigo de clientes  no lleva ''

export const sql_get2 = functions.https.onRequest((request, response) => {

    response.setHeader('Access-Control-Allow-Origin', '*');
    response.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
    // res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,contenttype'); // If needed
    response.setHeader('Access-Control-Allow-Credentials', 'true'); // If needed


    sql.connect(config).then(pool1 => {
        console.log("sql_get2");
        console.log(pool1);

       pool1.request().execute('APP_Parametros')
       .then(result => {
            console.dir(result)
            response.json({'result':result});  // Always emitted as the last one
            sql.close();
        })
       .catch(err => {
           response.json({'err':err});  // Always emitted as the last one
           sql.close();
        });
    });

    sql.on('error', err2 => {
     response.json({'errsql':err2});  // Always emitted as the last one

    })

 // response.send("Hello from Firebase!");
});


exports.sql_getDatosEmpresa = functions.https.onRequest((request, response) => {

    response.setHeader('Access-Control-Allow-Origin', '*');
    response.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
    // res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,contenttype'); // If needed
    response.setHeader('Access-Control-Allow-Credentials', 'true'); // If needed


    let Clientes=request.query.Clientes;


    sql.connect(config).then(pool1 => {
        console.log("sql_getDatosEmpresa");
        console.log(pool1);




       pool1.request()
       .input('Clientes', sql.VarChar(6), Clientes)
       .execute('APP_GetDatosEmpresa')
       .then(result => {
            // console.dir(result)
            response
            // .type('application / json')
            .send(result);  // Always emitted as the last one
            sql.close();
        })
       .catch(err => {
           response.json(err);  // Always emitted as the last one
           sql.close();
        });
    });

    sql.on('error', err2 => {
     response.json({'errsql':err2});  // Always emitted as the last one

    })

 // response.send("Hello from Firebase!");
});

export const sql_getPedidos = functions.https.onRequest((request, response) => {

    response.setHeader('Access-Control-Allow-Origin', '*');
    response.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
    // res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,contenttype'); // If needed
    response.setHeader('Access-Control-Allow-Credentials', 'true'); // If needed


    let COD_CLIENT=request.query.Codigo_Cliente;
    let cantDias=request.query.cantidadDias;
        console.log("COD_CLIENT",COD_CLIENT);
        console.log("cantDias",cantDias);

    sql.connect(config).then(pool1 => {
        console.log("sql_getPedidos");
        console.log(pool1);




       pool1.request()
       .input('COD_CLIENT', sql.VarChar(6), COD_CLIENT)
       .input('cantDias', sql.Int, +cantDias) // el + lo transoforma en numero
       .execute('APP_GetPedidos')
       .then(result => {
            // console.dir(result)
            response.json(result);  // Always emitted as the last one
            sql.close();
        })
       .catch(err => {
           response.json(err);  // Always emitted as the last one
           sql.close();
        });
    });

    sql.on('error', err2 => {
     response.json({'errsql':err2});  // Always emitted as the last one

    })

 // response.send("Hello from Firebase!");
});

export const sql_getDetallePedido = functions.https.onRequest((request, response) => {

    response.setHeader('Access-Control-Allow-Origin', '*');
    response.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
    // res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,contenttype'); // If needed
    response.setHeader('Access-Control-Allow-Credentials', 'true'); // If needed

    let idPedido=request.query.Id_Pedido;

     console.log("idPedido",idPedido);
    sql.connect(config).then(pool1 => {
        console.log("sql_getDetallePedido");
        console.log(pool1);


  console.log("idPedido",idPedido);

       pool1.request()
       .input('Id_Pedido', sql.Int, idPedido)
       .execute('APP_GetDetallePedido')
       .then(result => {
            console.dir(result)
            response.json(result);  // Always emitted as the last one
            sql.close();
        })
       .catch(err => {
           response.json(err);  // Always emitted as the last one
           sql.close();
        });
    });

    sql.on('error', err2 => {
     response.json(err2);  // Always emitted as the last one

    })

 // response.send("Hello from Firebase!");
});


exports.buscaVehiculos =functions.https.onRequest((req, res) => {
console.log("buscaVehiculos");

  cors(req, res, () => {


axios.post('https://ver.infotrak.com.ar:8144/api/vehiculos', {
    'Usuario': usuario,
    'Password':password
  })
// axios.all([buscaVehiculos()])
    .then((vehiculos)=> {
      console.log(vehiculos.data);
        res.status(200).send({'vehiculos':vehiculos.data});
                 return ("ok");

            }
    )
    .catch((e) => {
    console.log (e);
    res.status(400).send('Error'+ e);
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
    .then((vehiculos)=> {
      console.log(vehiculos.data);
        res.status(200).send({'vehiculosHistorico':vehiculos.data});
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
    .catch((e) => {
    console.log (e);
    res.status(400).send('Error'+ e);
  });

});
   });


