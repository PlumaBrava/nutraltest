import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup, FormControl,ValidatorFn, AbstractControl, ValidationErrors} from '@angular/forms';
// import {EmpresaModalComponent} from '../../empresa-modal/empresa-modal.component';
import {FiredatabaseService} from '../../services/firebase/firedatabase.service';
import {SqlserviceService} from '../../services/sql/sqlservice.service';
import { MensajesService }  from '../../services/mensajes/mensajes.service';
import { Router } from "@angular/router";


export function forbiddenNameValidator(nameRe: RegExp): ValidatorFn {
     console.log('nameRe',nameRe);
  return (control: AbstractControl): {[key: string]: any} | null => {
      console.log('control',control);

    const forbidden = nameRe.test(control.value);
     console.log('forbidden',forbidden);
    return forbidden ? {'forbiddenName': {value: control.value}} : null;
  };
}

export function validateMayorQue(number: number): ValidatorFn {
     console.log('number',number);
  return (control: AbstractControl): {[key: string]: any} | null => {
      console.log('control',control);
      let esCorrecto=false;
      if(control.value>number){
            esCorrecto=true;
      }
    // const forbidden = number.test(control.value);
     console.log('esCorrecto',esCorrecto);
    return !esCorrecto ? {'validateMayorQue': {value: control.value}} : null;
  };
}

@Component({
  selector: 'app-alertas-reposicion-crear',
  templateUrl: './alertas-reposicion-crear.component.html',
  styleUrls: ['./alertas-reposicion-crear.component.css']
})
export class AlertasReposicionCrearComponent implements OnInit {

// alertasReposicionForm
alertasReposicionForm = this.fb.group({

  nombreAlerta: ['', [Validators.required, forbiddenNameValidator(/bob/i)]],
  articulo: ['', Validators.required],
  // stockInicial: ['', Validators.required,validateMayorCero],
  stockInicial: ['', [Validators.required,validateMayorQue(0)]],
  cantidadDeAnimales: ['', Validators.required],
  consumoDiario: ['', Validators.required],
  capacidadDeAlmacenamiento: ['', Validators.required],
  diasDeMargen: ['', Validators.required],

    },{ validator: formValidator }); //recordar validator es en singular!!!!

listaDeProductos:any // son los productos que puede pedir este cliente

alertaParaEditar:any=null;
idAlerta:number=null;

perfilUsuario:any=null;



  constructor(  private db: FiredatabaseService,
                private fb: FormBuilder,
                public sql:SqlserviceService,
                private router:Router,
                private mensageService:MensajesService)
                { }

  ngOnInit() {

      this.getPerfil();
  }


getPerfil():void{
    this.alertaParaEditar=null;
    this.idAlerta=null
    console.log("Alerta crear get Perfil");
    this.mensageService.getPerfil().subscribe(perfil=>{
      console.log("Alerta crear perfil",perfil);
    this.perfilUsuario=perfil;
    this.getProductos();

   }) ;
}





getProductos(){

     this.db.getProductos(this.perfilUsuario.data.EmpresaSelected.COD_CLIENT).subscribe(data=>{
           this.listaDeProductos=data.listaProductos;
           console.log("Alerta crear listaDeProductos",data);
           this.getAlertaParaEditar();

       });

};

setArticuloSeleccionado(evento, producto){
    console.log("alerta crear evento", evento);
    console.log("alerta crear evento",evento.target.value);
    console.log(producto);
}

// se pone el el select para que muestre el cambio en el setting
compareFn(c1: any, c2:any): boolean {
    console.log('compara c1',c1);
    console.log('compara c2',c2);
     let r= c1 && c2 ? c1.articulo === c2.articulo : c1 === c2;
    console.log('compara r',r);
    console.log('compara c1 && c2',c1 && c2);
    // console.log('compara c1.articulo === c2.articulo',c1.articulo === c2.articulo);
    console.log('compara c1 === c2;',c1 === c2);
      return c1.articulo === c2.articulo ;
}

// compareFn( optionOne, optionTwo ) : boolean {
//     console.log('compara c1',optionOne);
//     console.log('compara c2',optionOne);
//      console.log('compara r',optionOne.articulo === optionTwo.articulo);
//   return optionOne.articulo === optionTwo.articulo;
// }

getAlertaParaEditar():void{
  this.mensageService.getAlertaSelectedObs().subscribe(alertaParaEditar=>{
      console.log("alerta crear getAlertaParaEditar",alertaParaEditar);

      if(alertaParaEditar!=null){

        this.alertaParaEditar=alertaParaEditar.alertaParaEditar;
        this.idAlerta=alertaParaEditar.id;
           console.log("alerta crear this.alertaParaEditar",this.alertaParaEditar);
           console.log("alerta crearthis.idAlerta", this.idAlerta);


        // this.alertasReposicionForm.setValue({alertaParaEditar});
        this.alertasReposicionForm.patchValue({
                nombreAlerta: this.alertaParaEditar.nombreAlerta,
                articulo: this.alertaParaEditar.articulo,
                stockInicial: this.alertaParaEditar.stockInicial,
                cantidadDeAnimales: this.alertaParaEditar.cantidadDeAnimales,
                consumoDiario: this.alertaParaEditar.consumoDiario,
                capacidadDeAlmacenamiento: this.alertaParaEditar.capacidadDeAlmacenamiento,
                diasDeMargen: this.alertaParaEditar.diasDeMargen,

        })
         // this.alertasReposicionForm.controls['articulo'].setValue(alertaParaEditar.articulo, {onlySelf: true});


    }else {
         console.log("alerta crear this.alertaParaEditar nulo",this.alertaParaEditar);
          this.alertaParaEditar=null;
          this.idAlerta=null;
    };
    });
};

borrarFormulario() {
  console.log("borrarFormulario");
  let temp={
          nombreAlerta: '',
          articulo: '',
          stockInicial: '',
          cantidadDeAnimales: '',
          consumoDiario: '',
          capacidadDeAlmacenamiento: '',
          diasDeMargen: ''    };

  this.alertasReposicionForm.patchValue( temp);


  this.alertasReposicionForm.markAsUntouched;
  this.alertasReposicionForm.markAsPristine;
  this.alertaParaEditar=null;
  this.idAlerta=null;

  // this.listaEmpresas=null;
  // this.key=null;
  };

grabarAlerta(){
  console.log("Grabar Alerta");
  console.log("Grabar Alerta", this.perfilUsuario );

  console.log("Grabar Alerta values", this.alertasReposicionForm.value);

  const alerta=this.alertasReposicionForm.value;
  console.log("Grabar Alerta articulo", this.alertasReposicionForm.value.articulo);
  console.log("Grabar Alerta articulo", alerta.articulo.COD_ARTICU);
  console.log("Grabar Alerta articulo", alerta.articulo.DESCRIPCIO);
  console.log("Grabar Alerta articulo", alerta.articulo.DESC_ADIC);
  console.log("Grabar Alerta articulo", alerta.articulo.ID_MEDIDA_STOCK);

  const articulo={
            COD_ARTICU:  alerta.articulo.COD_ARTICU,
            DESCRIPCIO:alerta.articulo.DESCRIPCIO,
            DESC_ADIC:alerta.articulo.DESC_ADIC,
            ID_MEDIDA_STOCK:alerta.articulo.ID_MEDIDA_STOCK
        };

  const  newAlerta= {
            articulo:articulo,
            cantidadDeAnimales:alerta.cantidadDeAnimales,
            capacidadDeAlmacenamiento: alerta.capacidadDeAlmacenamiento,
            consumoDiario: alerta.consumoDiario,
            diasDeMargen: alerta.diasDeMargen,
            nombreAlerta: alerta.nombreAlerta,
            stockInicial: alerta.stockInicial
            }



if (this.alertaParaEditar){
  console.log("Modificar Alerta");

  this.db.modificarAlerta(this.perfilUsuario,this.perfilUsuario.data.EmpresaSelected,newAlerta, this.idAlerta);
  this.alertaParaEditar=null;
  this.idAlerta=null;
  this.mensageService.setAlertaSelectedObs(null);
  this.router.navigate(['/alertaReposicionCrear']);
}else{

this.db.crearAlerta(this.perfilUsuario,this.perfilUsuario.data.EmpresaSelected,newAlerta);
}
}

}

export const formValidator: ValidatorFn = (control: FormGroup): ValidationErrors | null => {
console.log('formValidator control',control);
  const nombreAlerta = control.get('nombreAlerta');
  const articulo = control.get('articulo');
  const stockInicial = control.value.stockInicial;
  const cantidadDeAnimales = control.get('cantidadDeAnimales');
  const consumoDiario = control.get('consumoDiario');
  const capacidadDeAlmacenamiento = control.value.capacidadDeAlmacenamiento;
  const diasDeMargen = control.get('stoccantidadDeAnimaleskInicial');

  let pasaLaValidacion=true;
  let mensaje="";
console.log('formValidator stockInicial',stockInicial);
console.log('formValidator capacidadDeAlmacenamiento',capacidadDeAlmacenamiento);
  if(stockInicial>capacidadDeAlmacenamiento){
        pasaLaValidacion=false;
        mensaje="stockInicial es mayor que la capacidad del Almacenamiento";
  }
console.log('formValidator pasaLaValidacion',pasaLaValidacion);
  return pasaLaValidacion ?  null: { 'formError': mensaje } ;

};
