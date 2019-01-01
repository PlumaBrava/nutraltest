// referencia
// https://gist.github.com/codediodeio/5e02b605f2ab015f2fb1e60497bd46bf

import { Injectable } from '@angular/core';
import { AngularFireDatabaseModule, AngularFireDatabase  } from '@angular/fire/database';
// import {  FirebaseListObservable } from '@angular/fire/database-deprecated';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from "@angular/router";
import * as firebase from 'firebase';





@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authState: any = null;
  constructor(private afAuth: AngularFireAuth,
              private db: AngularFireDatabase,
              private router:Router) {
            console.log('authService start');
            this.afAuth.authState.subscribe((auth) => {
              this.authState = auth
              console.log('auth service', auth);
              // this.updateUserData();
            });
  }

  // Returns true if user is logged in
  get authenticated(): boolean {
    return this.authState !== null;
  }

  // Returns current user data
  get currentUser(): any {
    return this.authenticated ? this.authState : null;
  }

  // Returns
  get currentUserObservable(): any {
    return this.afAuth.authState
  }

  // Returns current user UID
  get currentUserId(): string {
    return this.authenticated ? this.authState.uid : '';
  }

  // Anonymous User
  get currentUserAnonymous(): boolean {
    return this.authenticated ? this.authState.isAnonymous : false
  }

  // Returns current user display name or Guest
  get currentUserDisplayName(): string {
    if (!this.authState) { return 'Guest' }
    else if (this.currentUserAnonymous) { return 'Anonymous' }
    else { return this.authState['displayName'] || 'User without a Name' }
  }

  //// Social Auth ////

  githubLogin() {
    const provider = new firebase.auth.GithubAuthProvider()
    return this.socialSignIn(provider);
  }

  googleLogin() {
    const provider = new firebase.auth.GoogleAuthProvider()
    return this.socialSignIn(provider);
  }

  facebookLogin() {
    const provider = new firebase.auth.FacebookAuthProvider()
    return this.socialSignIn(provider);
  }

  twitterLogin(){
    const provider = new firebase.auth.TwitterAuthProvider()
    return this.socialSignIn(provider);
  }

  private socialSignIn(provider) {
    return this.afAuth.auth.signInWithPopup(provider)
      .then((credential) =>  {
          this.authState = credential.user
          this.updateUserData()
      })
      .catch(error => console.log(error));
  }


  //// Anonymous Auth ////

  anonymousLogin() {
    return this.afAuth.auth.signInAnonymously()
    .then((user) => {
      this.authState = user
      this.updateUserData()
    })
    .catch(error => console.log(error));
  }

  //// Email/Password Auth ////

  emailSignUp(email:string, password:string) {
    return this.afAuth.auth.createUserWithEmailAndPassword(email, password)
      .then((user) => {
        console.log(user);
        this.authState = user
        this.updateUserData()
      })
      .catch(error => console.log(error));

      // code: "auth/email-already-in-use"
// message: "The email address is already in use by another account."
// code: "auth/invalid-email"
// message: "The email address is badly formatted."

  }

  emailLogin(email:string, password:string) {
     return this.afAuth.auth.signInWithEmailAndPassword(email, password)
       .then((user) => {
         console.log(user);
         this.authState = user.user
         this.updateUserData()
       })
       .catch(error => console.log(error)
// code: "auth/wrong-password"
// message: "The password is invalid or the user does not have a password."

// code: "auth/user-not-found"
// message: "There is no user record corresponding to this identifier. The user may have been deleted."

// code: "auth/network-request-failed"
// message: "A network error (such as timeout, interrupted connection or unreachable host) has occurred."

         );
  }

  // Sends email allowing user to reset password
  resetPassword(email: string) {
    var auth = firebase.auth();

    return auth.sendPasswordResetEmail(email)
      .then(() => console.log("email sent"))
      .catch((error) => console.log(error))
  }


  //// Sign Out ////

  signOut(): void {
    this.afAuth.auth.signOut();
    this.router.navigate(['/'])
  }


  //// Helpers ////

  private updateUserData(): void {
  // Writes user name and email to realtime db
  // useful if your app displays information about users or for admin features
    console.log('updateUserData');
    console.log('updateUserData',this.authState);

    let path = `users/${this.currentUserId}`; // Endpoint on firebase
    console.log(path);
    let data = {
                  email: this.authState.email,
                  name: this.authState.displayName
                }
    var cleanEmail = this.authState.email.replace(/\./g, ',');
    this.db.object(path).update(data).catch(error => console.log(error));
    var updateData={
      [`perfiles/${cleanEmail}`]: "perfil",
      [`fechasIngreso/${cleanEmail}`]: firebase.database.ServerValue.TIMESTAMP

      };
    console.log(updateData);
   this.db.object('data').update(updateData);

  }



}
