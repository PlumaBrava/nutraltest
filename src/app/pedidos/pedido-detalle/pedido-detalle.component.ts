import { Component, OnInit,OnDestroy  } from '@angular/core';
import {Observable, Subscription } from 'rxjs';
import { AuthService } from '../../services/firebase/auth.service';
import { MensajesService }  from '../../services/mensajes/mensajes.service';
import { Router } from "@angular/router";
import {SqlserviceService} from '../../services/sql/sqlservice.service';
import {SpinnerComponent} from '../../util/spinner/spinner.component';
import {FiredatabaseService} from '../../services/firebase/firedatabase.service';

@Component({
  selector: 'app-pedido-detalle',
  templateUrl: './pedido-detalle.component.html',
  styleUrls: ['./pedido-detalle.component.css']
})
export class PedidoDetalleComponent implements OnInit {
    subscriptionPedidoSelected: Subscription;
    pedidoSelected:any=null;
    pedidoDetalle:any=null;
    perfilUsuario:any=null;
    mensajeSpinner = "mensaje spinner";
    showSpinner:boolean = false;
    mensajeError:String = '';

  constructor( private authService:AuthService,
      private mensageService:MensajesService,
         private db: FiredatabaseService,
      private router:Router,
      public sql:SqlserviceService) { }

  ngOnInit() {
      this.getPedidoSelected();
      this.getPerfil();
  }

getPerfil():void{
    console.log("pedido crear get Perfil");
    this.mensageService.getPerfil().subscribe(perfil=>{
      console.log("pedido crear perfil",perfil);
    this.perfilUsuario=perfil;

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

          this.buscarDetalles(this.pedidoSelected.IdPedido )
          console.log(this.pedidoSelected);
          }
      },
          error =>{
             console.log("llego error");
             console.log(error);
         });


}


buscarDetalles(pedidoSeleccionado){

    this.sql.getPedidoDetalles(pedidoSeleccionado).subscribe(data=>
         {
        console.log(data);
        this.pedidoDetalle=data;
        this.setProductosPedidos();
        this.showSpinner=false;
          },
          error =>{console.log(error);
              this.showSpinner=false;
              this.mensajeError="Se produjo un error: /n nombre: " +error.name+"/n Mensaje: "+error.message+"/n";

         }
       );

}

setProductosPedidos(){  // ToDo: esto es mejor almacenarlo desde una funci'on al leerlas novedades
    this.pedidoDetalle.forEach((detalle) => {
    console.log("setProductosPedidos detalle",detalle);
    this.db.setProductos(this.perfilUsuario.data.EmpresaSelected.COD_CLIENT,detalle.COD_ARTICU,detalle.DESCRIPCIO,detalle.DESC_ADIC,detalle.ID_MEDIDA_STOCK );

    });
}


}
