import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { HttpParams   } from '@angular/common/http';
import { environment } from '../../../environments/environment';
// import {RequestOptions, URLSearchParams  } from '@angular/common/http';


import { Observable, throwError } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class SqlserviceService {
  // URL_SERVER:string='https://us-central1-ignatest-c4444.cloudfunctions.net/';  //Desarrollo
   // URL_SERVER:string='https://us-central1-laflota-19ada.cloudfunctions.net/'; // Produccion
   URL_SERVER:string=environment.nutralMix.SQL_SERVER; // Produccion
  constructor(private _http: HttpClient) { }

getEmpresas(empresas:string[]): Observable<any>{
    console.log("getEmpresas");
    console.log("getEmpresas search",empresas);

// Clientes='06MA01'
    const url:string=this.URL_SERVER+'sql_getDatosEmpresa?Clientes=%27'+empresas+'%27';
console.log("getEmpresas url",url);

 return this._http.get(url);


 };

getEmpresasPorRazonSocial(razonSocial:string): Observable<any>{
    console.log("getEmpresasPorRazonSocial");
    console.log("getEmpresasPorRazonSocial razonSocial",razonSocial);

// Clientes='06MA01'
    const url:string=this.URL_SERVER+'sql_getDatosEmpresaPorRazonSocial?razonsocial='+razonSocial;
console.log("getEmpresasPorRazonSocial url",url);

 return this._http.get(url);


 };

getPedidos(codEmpresa:string[],cantidadDias:Number): Observable<any>{
    console.log("getEmpresas");
    console.log("getEmpresas search",codEmpresa);

// Clientes='06MA01'
    const url:string=this.URL_SERVER+'sql_getPedidos?Codigo_Cliente='+
    codEmpresa+'&cantidadDias='+cantidadDias;
// https://us-central1-nutraltest.cloudfunctions.net/sql_getPedidos?Codigo_Cliente=06MA01&cantidadDias=5000
// https://us-central1-nutraltest.cloudfunctions.net/sql_getPedidos?Codigo_Cliente=06MA01&cantidadDias=5000

console.log("getPedidos url",url);

 return this._http.get(url);


 };

getPedidoDetalles(idPedido:string): Observable<any>{
    console.log("getPedidoDetalles");
    console.log("getPedidoDetalles idPedido",idPedido);

// Clientes='06MA01'
    const url:string=this.URL_SERVER+'sql_getDetallePedido?Id_Pedido='+
    idPedido;
// https://us-central1-nutraltest.cloudfunctions.net/sql_getPedidos?Codigo_Cliente=06MA01&cantidadDias=5000
// https://us-central1-nutraltest.cloudfunctions.net/sql_getPedidos?Codigo_Cliente=06MA01&cantidadDias=5000

console.log("getPedidoDetalles url",url);

 return this._http.get(url);


 };

 getPedidoDetallado(codEmpresa:string,cantidadDias:Number): Observable<any>{
    console.log("getPedidoDetallado");
    console.log("getPedidoDetallado codEmpresa",codEmpresa);
    console.log("getPedidoDetallado cantidadDias",cantidadDias);

// https://us-central1-nutraltest.cloudfunctions.net/sql_getPedidoDetallado?Codigo_Cliente=01JA01&cantidadDias=100
    const url:string=this.URL_SERVER+'sql_getPedidoDetallado?Codigo_Cliente='+
    codEmpresa+'&cantidadDias='+cantidadDias;

console.log("getPedidoDetallado url",url);

 return this._http.get(url);


 };

getRemitoDetallado(codEmpresa:string,cantidadDias:Number): Observable<any>{
    console.log("getRemitoDetallado");
    console.log("getRemitoDetallado codEmpresa",codEmpresa);
    console.log("getRemitoDetallado cantidadDias",cantidadDias);

// https://us-central1-nutraltest.cloudfunctions.net/sql_getPedidoDetallado?Codigo_Cliente=01JA01&cantidadDias=100
    const url:string=this.URL_SERVER+'sql_getRemitoDetallado?Codigo_Cliente='+
    codEmpresa+'&cantidadDias='+cantidadDias;

console.log("getRemitoDetallado url",url);

 return this._http.get(url);


 };



getVehiculos(): Observable<any>{
  console.log("getVehiculos");
  const url:string=this.URL_SERVER+'buscaVehiculos';
  return this._http.get(url);
 };



 test(){
     console.log('test');

 }


}
