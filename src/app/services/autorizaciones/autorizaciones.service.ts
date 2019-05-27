import { Injectable } from '@angular/core';
import { MensajesService }  from '../../services/mensajes/mensajes.service';
import { Router } from "@angular/router";
@Injectable({
  providedIn: 'root'
})
export class AutorizacionesService {

  datosUsuario:any;
  componenteInicio:string=null;
  constructor(
        private mensageService:MensajesService,
        private router:Router
        ) {

              this.mensageService.getPerfil().subscribe(datosUsuario=>{
                    this.datosUsuario=datosUsuario;
                    console.log(' this.componenteInicio', this.componenteInicio);
                    if(this.componenteInicio!=null){
                       this.validarAutorizacion(this.componenteInicio);
                        }


              })

         }

    validarAutorizacion(componente:string):boolean{
        console.log('validarAutorizacion',componente);

        // guardo el componente de inicio para hacer la validación en caso que el
        // no tenga datosUsuario
         console.log(' this.componenteInicio', this.componenteInicio);
        if(this.componenteInicio==null){
            this.componenteInicio=componente;
        }

        // Si no tengo datos de usuario lo envío a registrarse
        // si no hago un switch en función del perfil para verificar si puede ingresar a ese componente.

        console.log(' this.datosUsuario', this.datosUsuario);
        if(this.datosUsuario==null){
              this.router.navigate(['/registrarse']);
              return false;
        }


       else {

            // Switch del perfil de usuario
           console.log(' this.datosUsuario perfil', this.datosUsuario.data.perfil);
           console.log(' this.datosUsuario componente', componente);
           switch (this.datosUsuario.data.perfil) {


                case "administrador":

                    // Switch del componente
                    switch (componente) {
                        case "UsuarioListComponent":
                         this.router.navigate(['/usuariosList']);
                         return true;
                            // code...
                            break;

                        default:
                            this.router.navigate(['/ususario_no_autorizado']);
                            return false;
                            break;
                    }

                 break;


                case "cliente":
                // el route lo uso para redirigir el listado si actualizo, al verificar el usuario si no está logueado lo mando a registrarse
                    switch (componente) {
                        case "clientesList":
                         this.router.navigate(['/ClientesListComponent']);
                         return true;
                         break;
                        case "ClientesCrearComponent":
                         // this.router.navigate(['/ClientesListComponent']);
                         return true;
                         break;
                        case "SetingsComponent":
                         this.router.navigate(['/settings']);
                         return true;
                         break;
                        case "UsuarioListComponent":
                         this.router.navigate(['/ususario_no_autorizado']);
                         return false;
                         break;
                        case "PedidosComponent":
                         this.router.navigate(['/pedidos']);
                         return false;
                         break;
                        case "PedidoDetalleComponent":
                         this.router.navigate(['/pedidosDetalles']);
                         return false;
                         break;
                         case "PedidosCreadosListadoComponent":
                         this.router.navigate(['/pedidosCrearListados']);
                         return false;
                         break;
                         case "PedidoCreadoDetalleComponent":
                         this.router.navigate(['/pedidoCrearDetalles']);
                         return false;
                         break;
                         case "AvisosListComponent":
                         this.router.navigate(['/avisosList']);
                         return false;
                         break;
                         case "RemitosListadoComponent":
                         this.router.navigate(['/remitos']);
                         return false;
                         break;



                        default:
                             this.router.navigate(['/ususario_no_autorizado']);
                             return false;
                            break;
                    }

                  break;

                case "distribuidor":
                   // code...
                   break;

                 case "transportista":
                   // code...
                   break;

               default:

                   // Estos están habilitados sin estár loqueados.
                   switch (componente) {
                       case "LogGoogleComponent":
                       case "LogMailComponent":
                       case "RegistrarseComponent":
                           return true;
                           break;

                       default:
                            this.router.navigate(['/ususario_no_autorizado']);
                             return false;
                            break;
                   }

              break;
           }
       }

       // if(componente=='SetingsComponent'){
       //     this.router.navigate(['/settings']);
       //     return true;
       // } else{
       //     this.router.navigate(['/ususario_no_autorizado']);
       //     return false;
       // }
    }

}
