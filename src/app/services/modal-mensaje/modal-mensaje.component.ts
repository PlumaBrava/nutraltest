import { Component, OnInit,  Input} from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-modal-mensaje',
  templateUrl: './modal-mensaje.component.html',
  styleUrls: ['./modal-mensaje.component.css']
})
export class ModalMensajeComponent implements OnInit {
 @Input() name;
 @Input() titulo;
 @Input() mensaje;
 @Input() dato;

     model;
constructor(public modal: NgbActiveModal) {


}
  ngOnInit() {
      console.log(this.name);
      console.log(this.titulo);
      console.log(this.mensaje);
      console.log(this.dato);

  }

}
