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
    database: 'PRUEBA_APP',

        options: {
            encrypt: false // Use this if you're on Windows Azure
        }
    };




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
