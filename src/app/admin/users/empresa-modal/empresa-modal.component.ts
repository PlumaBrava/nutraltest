import { Component, OnInit,  Input} from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {SqlserviceService} from '../../../services/sql/sqlservice.service';

@Component({
  selector: 'app-empresa-modal',
  templateUrl: './empresa-modal.component.html',
  styleUrls: ['./empresa-modal.component.css']
})
export class EmpresaModalComponent implements OnInit {
 @Input() name;
     model;
  constructor(public modal: NgbActiveModal,public sql:SqlserviceService) { }
    empresa:string='';
    mensaje:string='';
    listaEmpresas:any[]= [];
    showLoading:boolean= false;
  ngOnInit() {
  console.log(this.name);
  console.log('empresa',this.empresa);
  this.buscarEmpresa(this.empresa);
  }

  buscarEmpresa(empresa){
            console.log(empresa);
    this.showLoading=true;
    this.sql.getEmpresasPorRazonSocial(empresa).subscribe(
          data => {
              this.showLoading=false;
              console.log(data);
              if(data.length==0){
                this.mensaje="no se encontraron datos";
              }else{
              this.listaEmpresas=data
              }
          //   if(this.listaEmpresas){
          //   this.listaEmpresas.push(data[0]);
          // }else{
          //    this.listaEmpresas=data;
          // }
        // this.page = data.body.page;
        // this.pageSize = data.body.perPage;
        // this.collectionSize = data.body.itemsCount;
        // this.esperandoDatos=false;

          },
          error =>{
             this.showLoading=false;
             this.mensaje="Error al buscar datos: " +error.message;
                 console.log(error);
         }
         );
  }

seleccionarEmpresa(empresa){
    console.log(empresa);
}
verEmpresa(empresa){
    console.log(empresa);
}

}

