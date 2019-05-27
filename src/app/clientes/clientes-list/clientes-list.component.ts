import { Component, OnInit,OnDestroy  } from '@angular/core';
import {Observable, Subscription } from 'rxjs';
import { AuthService } from '../../services/firebase/auth.service';
import { MensajesService }  from '../../services/mensajes/mensajes.service';
import {FiredatabaseService} from '../../services/firebase/firedatabase.service';
import { Router } from "@angular/router";
@Component({
  selector: 'app-clientes-list',
  templateUrl: './clientes-list.component.html',
  styleUrls: ['./clientes-list.component.css']
})
export class ClientesListComponent implements OnInit, OnDestroy  {

perfilUsuario:any=null;
empresaSelected:any=null;

  constructor(
      private authService:AuthService,
      private db: FiredatabaseService,
      private mensageService:MensajesService,
      private router:Router
      ) { }

  ngOnInit() {
      console.log("clientes");
      this.perfilUsuario=null;
      this.empresaSelected=null;
      this.getPerfil();


  }

getPerfil():void{
    console.log("get Perfil");
    this.mensageService.getPerfil().subscribe(perfil=>{
    this.perfilUsuario=perfil;
   }) ;
}

setEmpresaSelected(empresaSelected){
     console.log(this.empresaSelected);
    this.empresaSelected=empresaSelected;
    console.log(this.perfilUsuario);

    this.perfilUsuario['data']['EmpresaSelected']=empresaSelected;
    this.mensageService.setPerfilUsuarioObs(this.perfilUsuario);


    this.mensageService.setEmpresaSelectedObs(empresaSelected);
    this.db.updateUserEmpresaSelected(this.perfilUsuario.key,this.empresaSelected);
    this.router.navigate(['/pedidos']);


}


ngOnDestroy() {
        // unsubscribe to ensure no memory leaks
         // this.subscription.unsubscribe();
    }

}

