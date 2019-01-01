import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/firebase/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {


  constructor( public authService:AuthService) { }

  ngOnInit() {



  }




  loginGoogle() {
    this.authService.googleLogin();

  }
  logoutGoogle() {
      this.authService.signOut();

  }
}
