import { Component, OnInit,
  // ChangeDetectorRef
   } from '@angular/core';
import { AuthService } from '../services/firebase/auth.service';
import { MensajesService }  from '../services/mensajes/mensajes.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
perfilUsuario:any={};
empresa:string='';
  constructor( public authService:AuthService,
               private mensageService:MensajesService,
               //private cd: ChangeDetectorRef
               ) { }

  ngOnInit() {

 this.getPerfil();
  }


getPerfil():void{
    console.log("header getPerfil");
    this.mensageService.getPerfil().subscribe(perfil=>{
    this.perfilUsuario=perfil;
    if(perfil){
    this.empresa=perfil.data.EmpresaSelected.RAZON_SOCI;

    } else{
      this.empresa=null;
    }
   }) ;
}


  loginGoogle() {
    this.authService.googleLogin();

  }
  logoutGoogle() {
      this.authService.signOut();

  }
}
