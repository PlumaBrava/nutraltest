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
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.css']
})
export class PedidosComponent implements OnInit,OnDestroy {
subscriptionEmpresaSelected: Subscription;
perfilUsuario:any=null;
empresaSelected:any=null;
pedidoSelected:any=null;
remitoSelected:any=null;
pedidos:any=null;
   mensajeSpinner = "mensaje spinner";
    showSpinner:boolean = false;
    mensajeError:String = '';
  constructor(
      private authService:AuthService,
      private mensageService:MensajesService,
      private router:Router,
      public sql:SqlserviceService,
               private _modal: NgbModal,) { }

  ngOnInit() {
      console.log("pedidos");
      this.getPerfil();



  }

getPerfil():void{
    console.log("pedido  get Perfil");
    this.mensageService.getPerfil().subscribe(perfil=>{
      console.log("pedido  perfil",perfil);
    this.perfilUsuario=perfil;
     this.buscarPedidos(this.perfilUsuario.data.EmpresaSelected.COD_CLIENT )
   // this.getEmpresaSelected();

   }) ;
}

//  getEmpresaSelected():void{
//      console.log("getEmpresaSelected");
//      this.showSpinner=true;
//       this.subscriptionEmpresaSelected=  this.mensageService.getEmpresaSelectedObs().subscribe(p =>{
//                console.log("llego dato",p);
//           this.empresaSelected = p;
//           if(!p){//llego pedido null

//               console.log("llego pedido nulo");
//                this.router.navigate(['/clientesList']);
//           }else{

//           this.buscarPedidos(this.empresaSelected.COD_CLIENT )
//           console.log(this.empresaSelected);
//           }
//       },
//           error =>{
//              console.log("llego error");
//              console.log(error);
//          });
// }


buscarPedidos(codEmpresa){
    console.log('buscarPedidos');


    console.log('buscarPedidos this.empresaSelected', this.empresaSelected);
    console.log('buscarPedidos ventana',this.perfilUsuario.data.settings.ventanaVisualizacionPedido);

    this.showSpinner=true;

    // this.sql.getPedidos(codEmpresa,500).subscribe(data=>
    // this.sql.getPedidoDetallado(codEmpresa,500).subscribe(data=>
    this.sql.getPedidoDetallado(codEmpresa,this.perfilUsuario.data.settings.ventanaVisualizacionPedidos).subscribe(data=>
         {
        console.log(data);
        this.pedidos=this.acomodaPedidos(data);
        console.log(this.pedidos);

        this.showSpinner=false;
          },
          error =>{console.log(error);
              this.showSpinner=false;
              this.mensajeError="Se produjo un error: /n nombre: " +error.name+"/n Mensaje: "+error.message+"/n";

         }
   );
 }


acomodaPedidos(pedidos){
  console.log('acomodaPedidos pedidos',pedidos);

   let pedidoAcomodado=new Array();
   let indexPedidoAcomodado=0;
   for( let i=0;i<pedidos.length;i++){
     console.log('acomodaPedidos pedidos i',i);
     console.log('acomodaPedidos pedidos pedidos i',pedidos[i]);
     let p={
       NRO_PEDIDO:+pedidos[i].NRO_PEDIDO,
       FECHA_PEDI:pedidos[i].FECHA_PEDI,
       ESTADO:pedidos[i].ESTADO,
       FECHA_ENTR:pedidos[i].FECHA_ENTR,
       // N_REMITO:pedidos[i].N_REMITO,
       Desc_Estado:pedidos[i].Desc_Estado,
       detalle:new Array(),
       IdPedido:pedidos[i].IdPedido
     };

     pedidoAcomodado.push(p);
       let idAProcesar=0;
      for( let j=0;j<pedidos.length-i;j++){ //la longitud que falta recorrer es el total menos i (es lo recorrido)
       console.log('acomodaPedidos pedidos j',j);
       idAProcesar=i+j;
      if(pedidoAcomodado[indexPedidoAcomodado]['NRO_PEDIDO']==pedidos[(idAProcesar)].NRO_PEDIDO){ //
          pedidoAcomodado[indexPedidoAcomodado]['detalle'].push(pedidos[(idAProcesar)]);
          console.log('acomodaPedidos encontro Iguales',pedidos[(idAProcesar)]);
          if(pedidos[(idAProcesar)].N_REMITO!=''){
            pedidoAcomodado[indexPedidoAcomodado]['N_REMITO']=pedidos[(idAProcesar)].N_REMITO
          }
        continue; //Sigo con el siguiente
      } else {
        console.log('acomodaPedidos diferentes',pedidos[(idAProcesar)]);
        console.log('acomodaPedidos  sale i+j',(i+j));
        console.log('acomodaPedidos  sale idAProcesar',(idAProcesar));
        indexPedidoAcomodado++;

        break; // esto lo puedo hacer porque el listado de pedidos viene ordenado por Nro pedido
      };
       // console.log('acomodaPedidos  termina el for -> llegó al final i+j',(i+j));
      // i=i+j; // Cuando termina el fo
     }
      console.log('acomodaPedidos  termina el for -> llegó al final i+j',(i));
      console.log('acomodaPedidos  termina el for -> llegó al final idAProcesar',(idAProcesar));
      console.log('acomodaPedidos  pedidos.length',(pedidos.length));
      console.log('acomodaPedidos  pedidos.length-1',(pedidos.length-1));

      if (idAProcesar==(pedidos.length-1)){ // llegó al fin del array
         console.log('acomodaPedidos  final final',(i));
        break;
      }

       i=idAProcesar-1;  // el for externo le suma uno al ingresar nuevamente.
   }
  console.log('acomodaPedidos pedidoAcomodado',pedidoAcomodado);
  return pedidoAcomodado;
 }


setPedidoSelected(pedidoSelected){
     console.log(this.pedidoSelected);
    this.pedidoSelected=pedidoSelected;
    console.log(this.pedidoSelected);
    this.mensageService.setPedidoSelectedObs(pedidoSelected);
    this.router.navigate(['/remitosDetalles']);

}





ngOnDestroy() {
        // unsubscribe to ensure no memory leaks
         // this.subscriptionEmpresaSelected.unsubscribe();
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


}
