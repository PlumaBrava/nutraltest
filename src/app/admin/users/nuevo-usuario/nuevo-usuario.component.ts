import { Component, OnInit,Input} from '@angular/core';
import { NgbActiveModal, NgbModal,ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { AngularFireDatabaseModule, AngularFireDatabase  } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { AuthService } from '../../../services/firebase/auth.service';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import {EmpresaModalComponent} from '../empresa-modal/empresa-modal.component';
import {FiredatabaseService} from '../../../services/firebase/firedatabase.service';
import {SqlserviceService} from '../../../services/sql/sqlservice.service';
import { MensajesService }  from '../../../services/mensajes/mensajes.service';
import { User } from '../user';

@Component({
  selector: 'app-nuevo-usuario',
  templateUrl: './nuevo-usuario.component.html',
  styleUrls: ['./nuevo-usuario.component.css']
})

export class NuevoUsuarioComponent implements OnInit {

// copia los datos del usuario seleecionado en el formulario y copia
// la lista de empresas del usuario
// y key del usuario
   @Input() set userSelected  (userSelected: User ) {

    console.log('NuevoUsuarioComponent = ',userSelected);
    console.log('NuevoUsuarioComponent this = ',this.userSelected);
    this.crearLabelForm.patchValue( userSelected);
    this.crearLabelForm.value.empresa='';
     // this.crearLabelForm.setValue({'empresa':''});
    this.listaEmpresas=userSelected.empresas;
    this.key=userSelected.key;
    this.settings=userSelected.settings;
  };

crearLabelForm = this.fb.group({
  email: ['', [Validators.required,Validators.email]],
  perfil: ['', Validators.required],
  estado: ['', Validators.required],
  empresa: ['', ],
    });

  datosEmpresas: Observable<any[]>;

  tiposEstado=[{id:'pendiente',val:'Pendiente'},
              {id:'activo',val:'Activo'},
              {id:'suspendido',val:'Suspendido'} ];

  tiposPerfil=[{id:'administrador',val:'Administrador'},
              {id:'cliente',val:'Cliente'},
              {id:'administradorLog',val:'Administrador Logistica'},
              {id:'administradorForraje',val:'Administrador Forraje'},
              {id:'distribuidor',val:'Distribuidor'},
              {id:'transportista',val:'Transportista'}
               ];
// listaEmpresas:any[]= [ {"COD_CLIENT": "06MA01", "RAZON_SOCI": "MAGUIRRE, JAIME", "NOM_COM": 'MAGUIRRE, JAIME', "CUIT": "20-04409827-0", "LOCALIDAD": "CAPITAL FEDERAL"},
                        // {"COD_CLIENT": "06MA01", "RAZON_SOCI": "MAGUIRRE, JAIME", "NOM_COM": 'MAGUIRRE, JAIME', "CUIT": "20-04409827-0", "LOCALIDAD": "CAPITAL FEDERAL"}];
listaEmpresas:any[]= [];

seleccionEmpresas:string[]=[];

key:string=null;
settings:string=null;
existeEmailenlaBase:boolean=false;

    constructor(private db: FiredatabaseService,
                private fb: FormBuilder,
                 private _modal: NgbModal,
                // public authService:AuthService,
                public sql:SqlserviceService,
                private mensageService:MensajesService) {}



  ngOnInit() {
    this.getPerfil();

  }

getPerfil():void{
    console.log("usuarioNuevo  get Perfil");
    this.mensageService.getPerfil().subscribe(usuario=>{
      console.log("usuarioNuevo  usuario",usuario);
      switch (usuario.data.perfil) {
        case "administrador":
          this. tiposPerfil=[{id:'administrador',val:'Administrador'},
              {id:'gestorPedidos',val:'Gestor de Pedidos'},
              {id:'cliente',val:'Cliente'},
              {id:'distribuidor',val:'Distribuidor'},
              {id:'transportista',val:'Transportista'}
               ];
          break;

        default:
          // code...
          break;
      }


   }) ;
}


// updateUserData
// crea o modifica un usuario existente
// en caso de key=null crea uno nuevo, de lo contrario modifica el existente.

 updateUserData(): void {

  console.log('updateUserData this.userSelected',this.userSelected);
   var susc= this.db.validatUserMailExist(this.crearLabelForm.value.email).subscribe(existe=>{
      console.log('existeEmailenlaBase  validatUserMailExist existe',existe);

      console.log('existeEmailenlaBase  validatUserMailExist this.key',this.key);
           if(existe && this.key==null){
               console.log('existeEmailenlaBase  validatUserMailExist true existe');
               this.existeEmailenlaBase=true;
          } else{
                console.log('existeEmailenlaBase false validatUserMailExist no existe');
                this.existeEmailenlaBase=false;
                susc.unsubscribe();
                this.db.updateUserData(this.key,this.crearLabelForm.value.email,this.crearLabelForm.value.perfil,this.crearLabelForm.value.estado,this.listaEmpresas, this.settings )

                }
            });
 }


  agregarEmpresa(empresa){
    console.log('agregarEmpresa');
    console.log(this.crearLabelForm);

    console.log('agregarEmpresa hero', this.userSelected);
    console.log(this.crearLabelForm.value.empresa);
    this.seleccionEmpresas.push(this.crearLabelForm.value.empresa);
    // this.sql.test();
    this.sql.getEmpresas(this.crearLabelForm.value.empresa).subscribe(
          data => {
            if(this.listaEmpresas){
            this.listaEmpresas.push(data[0]);
          }else{
             this.listaEmpresas=data;
          }
        // this.page = data.body.page;
        // this.pageSize = data.body.perPage;
        // this.collectionSize = data.body.itemsCount;
        // this.esperandoDatos=false;
        console.log(data);
          },
          error =>{
     console.log(error);
         }
   );

  }

  borrarEmpresa(index){
    console.log('borrarEmpresa', index);
    this.listaEmpresas.splice(index, 1)

   console.log(this.listaEmpresas);

  }

borrarFormulario() {
  console.log("borrarFormulario");
  let temp={
          email: '',
          perfil: '',
          estado: '',
          empresa: ''    };
  this.crearLabelForm.patchValue( temp);

  this.listaEmpresas=null;
  this.key=null;
  };

buscarEmpresa(){
console.log('buscarEmpresa');

const modalRef =    this._modal.open(EmpresaModalComponent);
    modalRef.componentInstance.name = 'jj';
    modalRef.result.then(result=>{
            console.log("result: "+result);
            console.log("result.empresa: "+result.empresa);
            console.log("result.empresa: "+result.empresa.COD_CLIENT);
            console.log("result.cause: "+result.cause);
            if(result.empresa){

               let e={"COD_CLIENT": result.empresa.COD_CLIENT,
                   "RAZON_SOCI": result.empresa.RAZON_SOCI,
                   "NOM_COM": result.empresa.NOM_COM,
                   "CUIT": result.empresa.CUIT,
                   "LOCALIDAD": result.empresa.LOCALIDAD};

               if(this.listaEmpresas){
                  this.listaEmpresas.push(e);
                }else{
                   this.listaEmpresas=[e];
                }
            }
            // console.log("result.cause: "+result.cause);
            // console.log("result.date: "+result.date.year);
            // console.log("result.date: "+result.date.month);
            // console.log("result.date: "+result.date.day);
            // Cross click
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
           console.log('ss');

}


  }


