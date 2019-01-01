import { Component, OnInit,Input} from '@angular/core';
import { AngularFireDatabaseModule, AngularFireDatabase  } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { AuthService } from '../../../services/firebase/auth.service';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
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
// @Input()  userSelected: User;
   @Input() set userSelected  (userSelected: User ) {
    console.log('NuevoUsuarioComponent = ',userSelected);
    console.log('NuevoUsuarioComponent this = ',this.userSelected);
 this.crearLabelForm.patchValue( userSelected);
  this.crearLabelForm.value.empresa='';
 // this.crearLabelForm.setValue({'empresa':''});
this.listaEmpresas=userSelected.empresas;
  };

    constructor(private db: FiredatabaseService,
      private fb: FormBuilder,
      public authService:AuthService,
      public sql:SqlserviceService,
      private mensageService:MensajesService,) {}

  crearLabelForm = this.fb.group({
  email: ['', [Validators.required,Validators.email]],
  perfil: ['', Validators.required],
  estado: ['', Validators.required],
  empresa: ['', ],
    });

  datosEmpresas: Observable<any[]>;

  tiposEstado=[{id:'inicial',val:'Inicial'},
              {id:'activo',val:'Activo'},
              {id:'suspendido',val:'Suspendido'} ];

  tiposPerfil=[{id:'administrador',val:'Administrador'},
              {id:'cliente',val:'Cliente'},
              {id:'distribuidor',val:'Distribuidor'},
              {id:'transportista',val:'Transportista'}
               ];
listaEmpresas:any[]= [ {"COD_CLIENT": "06MA01", "RAZON_SOCI": "MAGUIRRE, JAIME", "NOM_COM": 'MAGUIRRE, JAIME', "CUIT": "20-04409827-0", "LOCALIDAD": "CAPITAL FEDERAL"},
                        {"COD_CLIENT": "06MA01", "RAZON_SOCI": "MAGUIRRE, JAIME", "NOM_COM": 'MAGUIRRE, JAIME', "CUIT": "20-04409827-0", "LOCALIDAD": "CAPITAL FEDERAL"}];

seleccionEmpresas:string[]=[];

  ngOnInit() {

  }

private updateUserData(): void {
  // Writes user name and email to realtime db
  // useful if your app displays information about users or for admin features
  this.db.updateUserData(this.crearLabelForm.value.email,this.crearLabelForm.value.perfil,this.crearLabelForm.value.estado,this.listaEmpresas)

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
          email: 'data.email',
          perfil: '',
          estado: '',
          empresa: ''    };
  this.crearLabelForm.patchValue( temp);

  this.listaEmpresas=null;
  };





  }


