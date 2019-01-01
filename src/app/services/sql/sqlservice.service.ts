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

 test(){
     console.log('test');

 }


}
