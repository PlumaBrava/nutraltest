import { Component, OnInit,ChangeDetectorRef ,NgZone } from '@angular/core';
import { NgbActiveModal, NgbModal,ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ModalMensajeComponent }  from '../../services/modal-mensaje/modal-mensaje.component';
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
      private cd: ChangeDetectorRef,
       private ngZone: NgZone,
        private _modal: NgbModal,) { }

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
           if (this.listaPedidos.length==0){
               this.mostrarMensajeModal("Mis Pedidos Web", "No se han encontrado pedidos","");
           }

       });

}

EditarPedido(pedidoParaEditar){
 console.log("pedido lista pedidoParaEditar",pedidoParaEditar);
  this.mensageService.setPedidoWebSelectedObs(pedidoParaEditar);
  this.ngZone.run(() => this.router.navigate(['/pedidoCrearDetalles']));
}

ProcesarPedido(pedidoParaProcesar){
 console.log("pedido lista ProcesarPedido",pedidoParaProcesar);
}

mostrarMensajeModal(titulo, mensaje, dato){
 console.log(titulo);
 console.log(mensaje);
 console.log(dato);
 const modalRef =    this._modal.open(ModalMensajeComponent);
    modalRef.componentInstance.titulo = titulo;
    modalRef.componentInstance.mensaje = mensaje;
    modalRef.componentInstance.dato = dato;
    modalRef.result.then(result=>{
            console.log("result: "+result);
            console.log("result.cause: "+result.cause);
            console.log("result.date: "+result.date.year);
            console.log("result.date: "+result.date.month);
            console.log("result.date: "+result.date.day);
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

}

}
