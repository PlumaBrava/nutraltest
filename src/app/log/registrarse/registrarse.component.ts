import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/firebase/auth.service';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
@Component({
  selector: 'app-registrarse',
  templateUrl: './registrarse.component.html',
  styleUrls: ['./registrarse.component.css']
})
export class RegistrarseComponent implements OnInit {
mail:String=null;
  confirmaMail:String=null;
  clave:String=null;
  confirmaClave:String=null;


crearLabelForm = this.fb.group({
  email: ['', Validators.required],
  confirmaEmail: ['', Validators.required],
  clave: ['', Validators.required],
  confirmaClave: ['', Validators.required],
});
  constructor(  private fb: FormBuilder,public authService:AuthService) { }

  ngOnInit() {
  }
 signUp() {
     console.log('signup')
     console.log('signup email',this.crearLabelForm.value.email)
     console.log('signup clave',this.crearLabelForm.value.clave)

    this.authService.emailSignUp(String(this.crearLabelForm.value.email),String(this.crearLabelForm.value.clave));
  }

}
