import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/firebase/auth.service';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-log-mail',
  templateUrl: './log-mail.component.html',
  styleUrls: ['./log-mail.component.css']
})
export class LogMailComponent implements OnInit {

  constructor(private fb: FormBuilder,public authService:AuthService) { }
crearLabelForm = this.fb.group({
  email: ['', Validators.required],
  confirmaEmail: ['', Validators.required],
  clave: ['', Validators.required],
  confirmaClave: ['', Validators.required],
});
  ngOnInit() {
  }
signIn() {
     console.log('signIn')
     console.log('signIn email',this.crearLabelForm.value.email)
     console.log('signIn clave',this.crearLabelForm.value.clave)

    this.authService.emailLogin(String(this.crearLabelForm.value.email),String(this.crearLabelForm.value.clave)).then((user) => {
         console.log(user)
       },(error) => console.log(error));
       // .catch(error => console.log(error));


  }

}
