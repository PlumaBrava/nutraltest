import { Component, OnInit,ChangeDetectorRef  } from '@angular/core';
import {FiredatabaseService} from '../../services/firebase/firedatabase.service';
import { MensajesService }  from '../../services/mensajes/mensajes.service';
import { Router } from "@angular/router";

@Component({
  selector: 'app-pedidos-creados-listado',
  templateUrl: './pedidos-creados-listado.component.html',
  styleUrls: ['./pedidos-creados-listado.component.css']
})
export class PedidosCreadosListadoComponent implements OnInit {

perfilUsuario:any=null;
empresaSelected:any=null;
listaPedidos:any=null;
// listaPedidos:[{}]=[{}];

  constructor( private db: FiredatabaseService,
      private mensageService:MensajesService,
      private router:Router,
      private cd: ChangeDetectorRef) { }

    ngOnInit() {
      console.log("pedido lista detalle");

    this.perfilUsuario=null;
    this.empresaSelected=null;
    this.getPerfil();
    // this.getEmpresaSelected();



   }

getPerfil():void{
    console.log("pedido lista get Perfil");
    this.mensageService.getPerfil().subscribe(perfil=>{
      console.log("pedido lista perfil",perfil);
    this.perfilUsuario=perfil;
    this.getPedidosWeb(this.perfilUsuario.data.EmpresaSelected.COD_CLIENT, 'creado' );

   }) ;
}

// getEmpresaSelected():void{
//      console.log("pedido lista getEmpresaSelected");
//      // this.showSpinner=true;
//      this.mensageService.getEmpresaSelectedObs().subscribe(p =>{
//                console.log("pedido crear llego empresa",p);
//           this.empresaSelected = p;
//           if(!p){//llego pedido null

//               console.log(" pedido listallego pedido nulo");
//                this.router.navigate(['/clientesList']);
//           }else{

//           this.getPedidosWeb(this.empresaSelected.COD_CLIENT, 'creado' );
//           console.log(this.empresaSelected);
//           }
//       },
//           error =>{
//              console.log(" pedido lista llego error");
//              console.log(error);
//          });
// }

getPedidosWeb(codEmpresa:string, estado:string){

     this.db.getPedidosWeb(codEmpresa,estado).subscribe(data=>{
console.log("pedido lista  this.listaPedidos", this.listaPedidos);
           this.listaPedidos=data;
            this.cd.detectChanges();
           console.log("pedido lista getPedidosWeb",data);

       });

}

EditarPedido(pedidoParaEditar){
 console.log("pedido lista pedidoParaEditar",pedidoParaEditar);
  this.mensageService.setPedidoWebSelectedObs(pedidoParaEditar);
    this.router.navigate(['/pedidoCrearDetalles']);
}

ProcesarPedido(pedidoParaProcesar){
 console.log("pedido lista ProcesarPedido",pedidoParaProcesar);
}

}
