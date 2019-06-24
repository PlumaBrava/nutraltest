import { Component, OnInit,ChangeDetectorRef } from '@angular/core';
import { AngularFireDatabaseModule, AngularFireDatabase  } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { MensajesService }  from '../../../services/mensajes/mensajes.service';
import { ModalMensajeComponent }  from '../../../services/modal-mensaje/modal-mensaje.component';
import { NgbActiveModal, NgbModal,ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { FiredatabaseService }  from '../../../services/firebase/firedatabase.service';
import { AutorizacionesService }  from '../../../services/autorizaciones/autorizaciones.service';
import { User } from '../user'


@Component({
  selector: 'ngbd-modal-confirm',
  template: `
  <div class="modal-header">
    <h4 class="modal-title" id="modal-title">Profile deletion</h4>
    <button type="button" class="close" aria-describedby="modal-title" (click)="modal.dismiss('Cross click')">
      <span aria-hidden="true">&times;</span>
    </button>
  </div>
  <div class="modal-body">
    <p><strong>Are you sure you want to delete <span class="text-primary">"John Doe"</span> profile?</strong></p>
    <p>All information associated to this user profile will be permanently deleted.
    <span class="text-danger">This operation can not be undone.</span>
    </p>
  </div>
  <div class="modal-footer">
    <button type="button" class="btn btn-outline-secondary" (click)="modal.dismiss('cancel click')">Cancel</button>
    <button type="button" class="btn btn-danger" (click)="modal.close('Ok click')">Ok</button>
  </div>
  `
})
export class NgbdModalConfirm {
  constructor(public modal: NgbActiveModal) {}
}





@Component({
  selector: 'app-usuario-list',
  templateUrl: './usuario-list.component.html',
  styleUrls: ['./usuario-list.component.css']
})
export class UsuarioListComponent implements OnInit {
  userSelected:User=new User();
  // listaUsuarios: User[];
 listaUsuarios: Array<User>;
 filtroMail: string=null;
 pageSize:number=25;
 page:number=1;
 collectionSize:number=26;
 previoMail:string='';
  constructor(db: AngularFireDatabase,
      private mensageService:MensajesService,
      private _modal: NgbModal,
      private autorizaciones:AutorizacionesService,
          private cd: ChangeDetectorRef,
      // private _modalMensaje: ModalMensajeComponent,
      private fs:FiredatabaseService) {


  }

  ngOnInit() {
   console.log("UsuarioListComponent");

     if(this.autorizaciones.validarAutorizacion("UsuarioListComponent")){
     console.log("settings  autorizado");

        // this.fs.getUsers().subscribe(data=>{
        this.fs.getUsersFilterMail('').subscribe(data=>{
    
                this.listaUsuarios =data;
                // this.collectionSize=data.length;
                console.log('this.listaUsuarios get', data);
                this.cd.detectChanges();
    })}else{
           console.log("settings NO  autorizado");
        }


  }



  setUserSelected(userSelected:User){
      console.log(this.userSelected);
    this.userSelected=userSelected;
    this.mensageService.setUserObs(userSelected);

    console.log(this.userSelected);
    console.log('this.listaUsuarios', this.listaUsuarios);
  }



ejecutarFiltroMail(){
  console.log('ejecutarFiltroMail this.filtroMail', this.filtroMail);
        this.fs.getUsersFilterMail(this.filtroMail).subscribe(data=>{
                this.listaUsuarios =data;
                console.log('this.ejecutarFiltroMail data', data);
                this.listaUsuarios;
            },error=>{
                console.log('this.ejecutarFiltroMail error', error);
            });
  }

ejecutarGetNext(){
        console.log('ejecutarGetNext');
        let last=this.listaUsuarios[this.listaUsuarios.length-1].email;
        this.previoMail=this.listaUsuarios[0].email; // se usa para buscar el previo
        this.fs.getUsersFilterMail(last).subscribe(data=>{
                this.listaUsuarios =data;
                console.log('this.ejecutarFiltroMail data', data);
                this.listaUsuarios;
            },error=>{
                console.log('this.ejecutarFiltroMail error', error);
            });
  };

  ejecutarGetPrevio(){
        console.log('ejecutarGetPrevio');
       
        this.fs.getUsersFilterMail(this.previoMail).subscribe(data=>{
                this.listaUsuarios =data;
                console.log('this.ejecutarFiltroMail data', data);
                this.listaUsuarios;
            },error=>{
                console.log('this.ejecutarFiltroMail error', error);
            });
  };

  loadPage(page: number) {
     console.log('loadPage', page);
     if(page==2){
       this.ejecutarGetNext();
     } else if( page == 1){
       this.ejecutarFiltroMail();
     }
   
    // if (page !== this.previousPage) {
    //   this.previousPage = page;
    //   this.loadData();
  
  }

}





