import { Component, OnInit,OnDestroy  } from '@angular/core';
import {Observable, Subscription } from 'rxjs';
import { AuthService } from '../../services/firebase/auth.service';
import { MensajesService }  from '../../services/mensajes/mensajes.service';
import { Router } from "@angular/router";
import {SqlserviceService} from '../../services/sql/sqlservice.service';
import {SpinnerComponent} from '../../util/spinner/spinner.component';
import {MapaComponent} from '../../mapa/mapa.component';
import { NgbActiveModal, NgbModal,ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-remitos-listado',
  templateUrl: './remitos-listado.component.html',
  styleUrls: ['./remitos-listado.component.css']
})
export class RemitosListadoComponent implements OnInit {

    perfilUsuario:any=null;
    empresaSelected:any=null;
    pedidoSelected:any=null;
    remitos:any=null;
    vehiculos:any=null;
    mensajeSpinner = "mensaje spinner";
    showSpinner:boolean = false;
    mensajeError:String = '';

  constructor(  private authService:AuthService,
                private mensageService:MensajesService,
                private router:Router,
                public sql:SqlserviceService,
                private _modal: NgbModal) { }

  ngOnInit() {
      console.log("remitos");
      this.getPerfil();
      // this.getEmpresaSelected();
      // this.getVehiculos();
  }

// getEmpresaSelected():void{
//      console.log("getEmpresaSelected");
//      this.showSpinner=true;
//   this.subscriptionEmpresaSelected=  this.mensageService.getEmpresaSelectedObs().subscribe(p =>{
//                console.log("llego dato",p);
//           this.empresaSelected = p;
//           if(!p){//llego pedido null

//               console.log("llego pedido nulo");
//                this.router.navigate(['/clientesList']);
//           }else{
//              console.log(this.empresaSelected);
//           this.buscarRemitos(this.empresaSelected.COD_CLIENT )

//           }
//       },
//           error =>{
//              console.log("llego error");
//              console.log(error);
//          });
// }

getPerfil():void{
    console.log("pedido  get Perfil");
    this.mensageService.getPerfil().subscribe(perfil=>{
    console.log("pedido  perfil",perfil);
    this.perfilUsuario=perfil;
    this.buscarRemitos(this.perfilUsuario.data.EmpresaSelected.COD_CLIENT,this.perfilUsuario.data.settings.ventanaVisualizacionPedidos )


   }) ;
}




buscarRemitos(codEmpresa,cantidadDeDias){
    console.log('buscarRemitos');


    console.log('buscarRemitos this.empresaSelected', this.empresaSelected);
    console.log('buscarRemitos cantidadDeDias',cantidadDeDias);

    this.showSpinner=true;


    this.sql.getRemitoDetallado(codEmpresa,cantidadDeDias).subscribe(data=>
         {
        console.log(data);
        this.remitos=this.acomodaRemitos(data);
        console.log(this.remitos);

        this.showSpinner=false;
          },
          error =>{console.log(error);
              this.showSpinner=false;
              this.mensajeError=" buscarRemitos Se produjo un error: /n nombre: " +error.name+"/n Mensaje: "+error.message+"/n";

         }
   );
 }


acomodaRemitos(remitos){
  console.log('acomodaRemitos remitos',remitos);

   let remitoAcomodado=new Array();
   let indexRemitoAcomodado=0;
   let safe=0;
   for( let i=0;i<remitos.length;i++){
     console.log('acomodaRemitos remitos i',i);
     console.log('acomodaRemitos remitos remitos[i]',remitos[i]);
     safe++;
     if(safe>100){
         break;
     }
     let r={
       N_REMITO:remitos[i].N_REMITO,
       FECHA_REMITO:remitos[i].FECHA_MOV,
       ESTADO:remitos[i].ESTADO_MOV,
       ID_INFOTRAK:remitos[i].ID_INFOTRAK,
       Desc_Estado:remitos[i].Desc_Estado,
       NOMBRE_TRA:remitos[i].NOMBRE_TRA,
       detalle:new Array()
     };

     remitoAcomodado.push(r);
         console.log('acomodaRemitos remitoAcomodado[indexRemitoAcomodado][N_REMITO]',remitoAcomodado[indexRemitoAcomodado]['N_REMITO']);

      for( let j=0;j<remitos.length-i;j++){ //la longitud que falta recorrer es el total menos i (es lo recorrido)
             console.log('acomodaRemitos pedidos j',j);
        console.log('acomodaRemitos remitos[(i+j)].N_REMITO',remitos[(i+j)].N_REMITO);

      if(remitoAcomodado[indexRemitoAcomodado]['N_REMITO']==remitos[(i+j)].N_REMITO){
         remitoAcomodado[indexRemitoAcomodado]['detalle'].push(remitos[(i+j)]);
          console.log('acomodaRemitos encontro Iguales',remitos[(i+j)]);
      } else {
        console.log('acomodaRemitos  sale i+j',(i+j));
        indexRemitoAcomodado++;
        i=i+j-1;
        break; // esto lo puedo hacer porque el listado de pedidos viene ordenado por Nro pedido
      }
     }
      // para que no tome el último caso para por acá cuando agrega el último objeto y sale del for
      // no sale por el else porque ya no hay mas remitos en otros casos siempre hay un objeto para evaluar
      // y sale por el else porque se trata de distintos objetos.
     if(i==remitos.length-1){
         break;
     }

   }
  console.log('acomodaRemitos pedidoAcomodado',remitoAcomodado);
  return remitoAcomodado;
 }


setPedidoSelected(pedidoSelected){
     console.log(this.pedidoSelected);
    this.pedidoSelected=pedidoSelected;
    console.log(this.pedidoSelected);
    this.mensageService.setPedidoSelectedObs(pedidoSelected);
    this.router.navigate(['/pedidosDetalles']);

}


mostrarMapa(idInfotrak){
console.log('buscarEmpresa');

const modalRef =    this._modal.open(MapaComponent);
    modalRef.componentInstance.idInfotrak = idInfotrak;
    modalRef.result.then(result=>{
            console.log("result: "+result);
            console.log("result.empresa: "+result.empresa);
            console.log("result.empresa: "+result.empresa.COD_CLIENT);
            console.log("result.cause: "+result.cause);
            if(result.empresa){

               let e={"COD_CLIENT": result.empresa.COD_CLIENT,
                   "RAZON_SOCI": result.empresa.RAZON_SOCI,
                   "NOM_COM": result.empresa.NOM_COM,
                   "CUIT": result.empresa.CUIT,
                   "LOCALIDAD": result.empresa.LOCALIDAD};

               // if(this.listaEmpresas){
               //    this.listaEmpresas.push(e);
               //  }else{
               //     this.listaEmpresas=[e];
               //  }
            }
            // console.log("result.cause: "+result.cause);
            // console.log("result.date: "+result.date.year);
            // console.log("result.date: "+result.date.month);
            // console.log("result.date: "+result.date.day);
            // Cross click
          },reason=>{
            console.log("rison: "+reason);
             if (reason === ModalDismissReasons.ESC) {
            return 'by pressing ESC';
          } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
            return 'by clicking on a backdrop';
          } else {
            return  `with: ${reason}`;
          }
          } );
           console.log('ss');

}


ngOnDestroy() {
        // unsubscribe to ensure no memory leaks
         // this.subscriptionEmpresaSelected.unsubscribe();
        }

}
