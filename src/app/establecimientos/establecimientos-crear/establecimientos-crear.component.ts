import { Component, OnInit  } from '@angular/core';
import {FiredatabaseService} from '../../services/firebase/firedatabase.service';
import { MensajesService }  from '../../services/mensajes/mensajes.service';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Router } from "@angular/router";

@Component({
  selector: 'app-establecimientos-crear',
  templateUrl: './establecimientos-crear.component.html',
  styleUrls: ['./establecimientos-crear.component.css']
})
export class EstablecimientosCrearComponent implements OnInit {
establecimientoParaEditar:any=null;

perfilUsuario:any=null;

mensajeError:string=null;

listaDeEstablecimientos:any // son los productos que puede pedir este cliente
  constructor( private db: FiredatabaseService,
                private fb: FormBuilder,
                private router:Router,
                private mensageService:MensajesService) { }

  ngOnInit() {
  }

}
