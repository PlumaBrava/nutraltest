import { Component, OnInit,OnDestroy  } from '@angular/core';
import {Observable, Subscription } from 'rxjs';
import { AuthService } from '../../services/firebase/auth.service';
import { MensajesService }  from '../../services/mensajes/mensajes.service';
import { Router } from "@angular/router";
import {SqlserviceService} from '../../services/sql/sqlservice.service';
import {SpinnerComponent} from '../../util/spinner/spinner.component';

@Component({
  selector: 'app-remitos-detalle',
  templateUrl: './remitos-detalle.component.html',
  styleUrls: ['./remitos-detalle.component.css']
})
export class RemitosDetalleComponent implements OnInit {
    subscriptionPedidoSelected: Subscription;
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
                public sql:SqlserviceService
            ) { }

  ngOnInit() {
      console.log("RemitosDetalle");
      this.getPerfil();

  }


getPerfil():void{
    console.log("pedido  get Perfil");
    this.mensageService.getPerfil().subscribe(perfil=>{
    console.log("pedido  perfil",perfil);
    this.perfilUsuario=perfil;
    // this.buscarRemitos(this.perfilUsuario.data.EmpresaSelected.COD_CLIENT,this.perfilUsuario.data.settings.ventanaVisualizacionPedidos )
    this.getPedidoSelected();

   }) ;
}

getPedidoSelected():void{
     console.log("getPedidoSelected");
     this.showSpinner=true;
  this.subscriptionPedidoSelected=  this.mensageService.getPedidoSelectedObs().subscribe(p =>{
               console.log("llego dato pedido Selected",p);
          this.pedidoSelected = p;
          if(!p){//llego pedido null

              console.log("llego pedido nulo");
               this.router.navigate(['/clientesList']);
          }else{

       this.buscarRemitoDetalle(this.pedidoSelected.N_REMITO );
          console.log(this.pedidoSelected);
          }
      },
          error =>{
             console.log("llego error");
             console.log(error);
         });


}

buscarRemitoDetalle(remito){
    console.log('buscarRemitoDetalle');


    console.log('buscarRemitoDetalle this.empresaSelected', this.empresaSelected);
    console.log('buscarRemitoDetalle remito', remito);


    this.showSpinner=true;


    this.sql.getRemitoXNumero(remito).subscribe(data=>
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
        let idAProcesar=0;
      for( let j=0;j<remitos.length-i;j++){ //la longitud que falta recorrer es el total menos i (es lo recorrido)
        idAProcesar=i+j;
             console.log('acomodaRemitos pedidos j',j);
        console.log('acomodaRemitos remitos[(i+j)].N_REMITO',remitos[(idAProcesar)].N_REMITO);

      if(remitoAcomodado[indexRemitoAcomodado]['N_REMITO']==remitos[(idAProcesar)].N_REMITO){
         remitoAcomodado[indexRemitoAcomodado]['detalle'].push(remitos[(idAProcesar)]);
          console.log('acomodaRemitos encontro Iguales',remitos[(idAProcesar)]);
          continue;
      } else {
        console.log('acomodaRemitos  sale i+j',(idAProcesar));
        indexRemitoAcomodado++;

        break; // esto lo puedo hacer porque el listado de pedidos viene ordenado por Nro pedido
      }
     }
      // para que no tome el último caso para por acá cuando agrega el último objeto y sale del for
      // no sale por el else porque ya no hay mas remitos en otros casos siempre hay un objeto para evaluar
      // y sale por el else porque se trata de distintos objetos.
     if(idAProcesar==remitos.length-1){
         break;
     }
     i=idAProcesar-1;

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





ngOnDestroy() {
        // unsubscribe to ensure no memory leaks
         // this.subscriptionEmpresaSelected.unsubscribe();
        }


}
