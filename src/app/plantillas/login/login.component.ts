import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/firebase/auth.service';
import { NgbActiveModal, NgbModal,ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

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
