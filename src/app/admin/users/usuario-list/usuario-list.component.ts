import { Component, OnInit } from '@angular/core';
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
  constructor(db: AngularFireDatabase,
      private mensageService:MensajesService,
      private _modal: NgbModal,
      private autorizaciones:AutorizacionesService,
      // private _modalMensaje: ModalMensajeComponent,
      private fs:FiredatabaseService) {
      // this.listaUsuarios = db.list('users').valueChanges();


// this.listaUsuarios=this.fs.getUsers();

  }

  ngOnInit() {
   console.log("UsuarioListComponent");

     if(this.autorizaciones.validarAutorizacion("UsuarioListComponent")){
     console.log("settings  autorizado");

        this.fs.getUsers().subscribe(data=>{
                this.listaUsuarios =data;
                console.log('this.listaUsuarios get', data);
                this.listaUsuarios;
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



   const modalRef =    this._modal.open(ModalMensajeComponent);
    modalRef.componentInstance.name = this.filtroMail;
    modalRef.result.then(result=>{
            console.log("result: "+result);
            console.log("result.cause: "+result.cause);
            console.log("result.date: "+result.date.year);
            console.log("result.date: "+result.date.month);
            console.log("result.date: "+result.date.day);
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
           console.log(this.filtroMail);



        this.fs.getUsersFilterMail(this.filtroMail).subscribe(data=>{
                this.listaUsuarios =data;
                console.log('this.ejecutarFiltroMail data', data);
                this.listaUsuarios;
            },error=>{
                console.log('this.ejecutarFiltroMail error', error);
            });
  }


}





