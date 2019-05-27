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
    listaEmpresas:any[]= [ ];
  ngOnInit() {
  console.log(this.name);
  }

  buscarEmpresa(empresa){
            console.log(empresa);
    this.sql.getEmpresasPorRazonSocial(empresa).subscribe(
          data => {
              console.log(data);
              if(data){
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

