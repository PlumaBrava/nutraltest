import { Component, OnInit,ChangeDetectorRef  } from '@angular/core';
import {FiredatabaseService} from '../../services/firebase/firedatabase.service';
import { MensajesService }  from '../../services/mensajes/mensajes.service';
import { Router } from "@angular/router";

@Component({
  selector: 'app-alertas-reposicion-listado',
  templateUrl: './alertas-reposicion-listado.component.html',
  styleUrls: ['./alertas-reposicion-listado.component.css']
})
export class AlertasReposicionListadoComponent implements OnInit {
    perfilUsuario:any=null;
    listaAlertas:any=null;

  constructor( private db: FiredatabaseService,
      private mensageService:MensajesService,
      private router:Router,
      private cd: ChangeDetectorRef) { }

  ngOnInit() {
       console.log("pedido lista detalle");

    this.perfilUsuario=null;
    this.getPerfil();

  }




getPerfil():void{
    console.log("pedido lista get Perfil");
    this.mensageService.getPerfil().subscribe(perfil=>{
      console.log("pedido lista perfil",perfil);
    this.perfilUsuario=perfil;
    this.getAlertasReposicion(this.perfilUsuario.data.EmpresaSelected.COD_CLIENT, ''); //mando un nulo en estado

   }) ;
}

getAlertasReposicion(codEmpresa:string,estado: string){

     this.db.getAlertas(codEmpresa, estado).subscribe(data=>{
    console.log("pedido lista  this.listaPedidos", this.listaAlertas);
           this.listaAlertas=data;
            this.cd.detectChanges();
           console.log("pedido lista listaAlertas",data);

       });

}

editarAlerta(alertaParaEditar, id){
 console.log("pedido lista alertaParaEditar",alertaParaEditar);
 console.log("pedido lista id",id);
  this.mensageService.setAlertaSelectedObs({alertaParaEditar:alertaParaEditar, id:id});
    this.router.navigate(['/alertaReposicionCrear']);
}





}
