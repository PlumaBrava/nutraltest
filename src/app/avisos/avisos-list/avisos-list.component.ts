import { Component, OnInit,OnDestroy  } from '@angular/core';
import {Observable, Subscription } from 'rxjs';
import { AuthService } from '../../services/firebase/auth.service';
import { MensajesService }  from '../../services/mensajes/mensajes.service';
import { Router } from "@angular/router";

@Component({
  selector: 'app-avisos-list',
  templateUrl: './avisos-list.component.html',
  styleUrls: ['./avisos-list.component.css']
})
export class AvisosListComponent implements OnInit {
subscription: Subscription;
perfilUsuario:any=null;
empresaSelected:any=null;
  constructor(  private authService:AuthService,
      private mensageService:MensajesService,
      private router:Router) { }


 ngOnInit() {
      console.log("clientes");
      this.perfilUsuario=null;
      this.empresaSelected=null;
      this.getPerfil();


  }

getPerfil():void{
    console.log("get Perfil");
     // var p={
     //      next:function(n){
     //          console.log("next");

     //          this.perfilUsuario=n;
     //          this.casa="mi casa";
     //            console.log(this.perfilUsuario);
     //            console.log(this.casa);
     //      },
     //       error: function(e){
     //          console.log("error");
     //          console.log(e);
     //      },conclude: function(c){
     //          console.log("conclude");
     //          console.log(c);
     //      },

     //  };

      this.mensageService.getUserObs().subscribe(function(u){
          console.log(" clientes list user");
          console.log(u);

      });
   this.subscription=  this.mensageService.getPerfilUsuarioSeleccionadoObs()
    .subscribe(
        p =>
        {
            console.log("clientes list-llegan datos perfil ususario");
            console.log(p);
            if(!p){

             this.subscription=  this.mensageService.getPerfilUsuarioObs()

                 .subscribe(p1 =>{
                    console.log("clientes list-llegan datos perfil ususario p2");
                    console.log(p1);
                    this.perfilUsuario = p1.data;

                    });
             }
            else{
                this.perfilUsuario = p;
            }
        },
         error =>
        {
            console.log("clientes list-llegan datos perfil error");
            console.log(error);

        });
}

setEmpresaSelected(empresaSelected){
     console.log(this.empresaSelected);
    this.empresaSelected=empresaSelected;
    console.log(this.empresaSelected);
    this.mensageService.setEmpresaSelectedObs(empresaSelected);

    this.router.navigate(['/pedidos']);

}


ngOnDestroy() {
        // unsubscribe to ensure no memory leaks
         this.subscription.unsubscribe();
    }
}
