import { Injectable } from '@angular/core';
import { Observable, throwError, of } from 'rxjs';


import { User } from '../../admin/users/user';


@Injectable({
  providedIn: 'root'
})

export class MensajesService {

  user: User = new User();
  constructor() { }

    setUserObs(user: User): Observable<User> {
      console.log(user);
       this.user=user;
       return of (this.user);
    }

    getUserObs(): Observable<User> {
       return of (this.user);
    }

}
