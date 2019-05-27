
// https://angular-maps.com/api-docs/agm-core/components/agminfowindow
import { Component, OnInit, Input } from '@angular/core';
import { timer } from 'rxjs/observable/timer';

import {SqlserviceService} from '../services/sql/sqlservice.service';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.css']
})
export class MapaComponent implements OnInit {
   @Input() idInfotrak;
  vehiculos:any=null;
  zoom: number = 15;
  lat: number = -34.581423;
  lng: number = -58.406245;
  label:string="";
  nombreTransporte:string="";

    icono= {
        url: '../../assets/images/Truck-icon.ico',
        scaledSize: {
            width: 40,
            height: 60,
        }};

   mensajeSpinner = "mensaje spinner";
   showSpinner:boolean = false;
   mensajeError:String = '';


    //  icono= {
    //     path: 'M 125,5 155,90 245,90 175,145 200,230 125,180 50,230 75,145  5,90 95,90 z',
    //     scale: 1,
    //     fillColor: "red",
    //     fillOpacity: 0.8,
    //     strokeWeight: 2,
    //     rotation: 150 //this is how to rotate the pointer
    // };

    // icono triangulo
    //  icono=  {
    //   // path: 'M 0 0 L -35 -100 L 35 -100 z',
    //   // path: '../../assets/images/Truck-icon.svg',  (esto no funciona)
    //   path :'M156 1368 c-4 -13 -25 -222 -22 -225 0 0 145 -28 321 -60 l320 -60 6 56 c4 31 7 91 8 133 1 76 1 76 -26 82 -16 3 -145 22 -288 41 -143 20 -272 38 -288 41 -18 4 -28 1 -31 -8z',
    //   fillColor: '#3884ff',
    //   fillOpacity: 0.7,
    //   scale: 1,
    //   strokeColor: '#356cde',
    //   rotation: 90, //rota
    //   strokeWeight: 1
    // };

  constructor(public sql:SqlserviceService,public modal: NgbActiveModal) { }

  ngOnInit() {
      console.log("idinfotrack",this.idInfotrak);
        const source = timer(500,10000); // se dispara cada 10000 ms (10seg) el primero es a los 50 ms
//output: 0,1,2,3,4,5......
const subscribe = source.subscribe(val =>
    console.log(val));
    this.getVehiculos();
  }

getVehiculos(){
    console.log("getVehiculos");
       this.sql.getVehiculos().subscribe(data=>
         {
        console.log(data);
        console.log("getVehiculos",data);
        this.vehiculos=data;
        this.getUbicacionTransporte(this.idInfotrak);
        this.showSpinner=false;
          },
          error =>{console.log("getVehiculos",error);
              this.showSpinner=false;
              this.mensajeError="Se produjo un error: /n getVehiculos: " +error.name+"/n Mensaje: "+error.message+"/n";

         });
}

getUbicacionTransporte(idInfotrak){
  console.log("idInfotrak",idInfotrak);
  console.log("idInfotrak lat",this.lat);
  console.log("idInfotrak lng",this.lng);
  let vehiculoSeleccionado=null
  this.vehiculos.forEach(function(vehiculo,index){

    if(vehiculo.id==idInfotrak){

       vehiculoSeleccionado=vehiculo;


    }
    })
console.log("vehiculoSeleccionado vehiculoSeleccionado",vehiculoSeleccionado);
this.lat=vehiculoSeleccionado.latitud;
this.lng=vehiculoSeleccionado.longitud;
this.nombreTransporte=vehiculoSeleccionado.nombre;
      // patente
      // sentido
      // velocidad
}
}
