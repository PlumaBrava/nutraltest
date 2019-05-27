import { Component, OnInit , Input} from '@angular/core';
import {FiredatabaseService} from '../../services/firebase/firedatabase.service';
import { MensajesService }  from '../../services/mensajes/mensajes.service';
import { Router } from "@angular/router";
@Component({
  selector: 'app-pedido-creado-detalle',
  templateUrl: './pedido-creado-detalle.component.html',
  styleUrls: ['./pedido-creado-detalle.component.css']
})
export class PedidoCreadoDetalleComponent implements OnInit {
pedidoParaEditar:any=null;

perfilUsuario:any=null;


itemPedido:any=[];
items:any[]=[];
articuloSeleccionado:any;


// Valores Seleccionados
articulo:any={};
cantidad:number=0;


unidadDeMedida:string='';
mensajeError:string=null;

listaDeProductos:any // son los productos que puede pedir este cliente

  constructor(      private db: FiredatabaseService,
      private mensageService:MensajesService,
      private router:Router) { }

  ngOnInit() {
      console.log("pedido crear detalle");
      console.log("pedido crear detalle this.itemPedido", this.itemPedido);
    this.perfilUsuario=null;
    // this.empresaSelected=null;
    this.getPerfil();
    // this.getEmpresaSelected();



   }

getPerfil():void{
    console.log("pedido crear get Perfil");
    this.mensageService.getPerfil().subscribe(perfil=>{
      console.log("pedido crear perfil",perfil);
    this.perfilUsuario=perfil;
    this.getProductos();

   }) ;
}




getPedidoParaEditar():void{
  this.mensageService.getPedidoWebSelectedObs().subscribe(pedidoParaEditar=>{
      console.log("pedido crear pedidoParaEditar",pedidoParaEditar);
      this.pedidoParaEditar=pedidoParaEditar;
      if(this.pedidoParaEditar!=null){

       for(let i=0; i< this.pedidoParaEditar.detalle.length; i++ ) {
          this.articulo = this.pedidoParaEditar.detalle[i].articulo;
          this.cantidad = this.pedidoParaEditar.detalle[i].cantidad;
          this.unidadDeMedida = this.pedidoParaEditar.detalle[i].unidad;
          this.agregarItem();
          };
      }
  })
}



getProductos(){

     this.db.getProductos(this.perfilUsuario.data.EmpresaSelected.COD_CLIENT).subscribe(data=>{
           this.listaDeProductos=data.listaProductos;
           // this.articuloSeleccionado=this.listaDeProductos[0];
           console.log("pedido crear detalle data",data);
           this.getPedidoParaEditar();

       });

}

// Borra el item de la disponibilidad de productos y lo agrega a la lista de items a comprar
    agregarItem(){

      console.log("pedido crear detalle agregarItem articulo", this.articulo);
      let validaciones:boolean=true;
      let item:any;
      this.mensajeError="";
      if(!this.articulo.COD_ARTICU){
        console.log("pedido crear detalle agregarItem this.articulo",this.articulo);
        this.mensajeError="seleccione un artículo";
        validaciones=false;

      } else {

      }
      if(this.cantidad<=0){
        console.log("pedido crear detalle agregarItem itemPedido.length=0"); ;
        this.mensajeError=this.mensajeError+" La cantidad debe ser mayor que cero"
         validaciones=false;

      }

      console.log("pedido crear detalle articulo", (this.articulo));
      console.log("pedido crear detalle cantidad", (this.cantidad));
      console.log("pedido crear detalle unidadDeMedida", (this.unidadDeMedida));

      if (validaciones){
        this.items.push({articulo:this.articulo,cantidad:this.cantidad,unidad:this.unidadDeMedida });
        this.cantidad=0;
        this.unidadDeMedida='';
        for(var i =  this.listaDeProductos.length - 1; i >= 0; i--) {
          if( this.listaDeProductos[i].COD_ARTICU === this.items[this.items.length - 1].articulo.COD_ARTICU) {
           console.log("saco",this.listaDeProductos[i].COD_ARTICU);
           this.listaDeProductos.splice(i, 1);
          }
        }
      }else {
         console.log("Validaciones Incorrectas");
         return;
      }
}


// Borrar Item saca el item del listado  a comprar y lo agrega a la lista de productos disponibles
 modificarItem(index){

    console.log("pedido crear detalle modificarItem", index); ;
    this.listaDeProductos.push(this.items[index].articulo);
    this.articuloSeleccionado=this.items[index];
    this.itemPedido=this.items[index];
    this.items.splice(index, 1);
    console.log("pedido crear detalle modificaitemPedidorItem", this.itemPedido); ;
 }

// Borrar Item saca el item del listado  a comprar y lo agrega a la lista de productos disponibles
 borrarItem(index){

    console.log("pedido crear detalle borrarItem", index); ;
     this.listaDeProductos.push(this.items[index].articulo);
     this.items.splice(index, 1);
 }

setArticuloSeleccionado(itemPedido){
    console.log("pedido crear setArticuloSeleccionado", JSON.parse(itemPedido.articulo));
    const item=JSON.parse(itemPedido.articulo);
     this.mensajeError="";
    if(itemPedido){
       console.log("pedido crear itemPedido no nulo");
    this.unidadDeMedida = item. ID_MEDIDA_STOCK;
    this.articulo = item;
    }
}
grabarPedido(){
  console.log("Grabar Pedidos");
  console.log("Grabar Pedidos", this.perfilUsuario );

if (this.pedidoParaEditar){
  console.log("Modificar Pedidos");

  this.db.modificarPedidoWeb(this.perfilUsuario,this.perfilUsuario.data.EmpresaSelected,this.items,this.pedidoParaEditar.NRO_PEDIDO);

}else{
  console.log("Grabar Pedidos", this.items);
this.db.crearPedidoWeb(this.perfilUsuario,this.perfilUsuario.data.EmpresaSelected,this.items);
}
}

}
