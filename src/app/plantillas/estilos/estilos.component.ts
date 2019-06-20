import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/firebase/auth.service';
import { NgbActiveModal, NgbModal,ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';

@Component({
    selector: 'app-estilos',
    templateUrl: './estilos.component.html',
    styleUrls: ['./estilos.component.css']
})
export class EstilosComponent implements OnInit {

    constructor(
        private fb: FormBuilder,
        public authService:AuthService,
        private _modal: NgbModal
    ){}

    crearLabelForm = this.fb.group({
        email: ['', Validators.required],
        clave: ['', Validators.required]
    });

    ngOnInit(){}

}
