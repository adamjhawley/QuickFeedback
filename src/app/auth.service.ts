import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public user$!: Observable<firebase.User | null>

  constructor(public auth: AngularFireAuth) {
    this.user$ = new Observable<firebase.User | null>(subscriber => {
      this.auth.authState.subscribe({
        next: (user) => subscriber.next(user)
      })
    })
  }

  signInWithGoogle() {
    return this.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }

  signInWithEmail(email: string, password: string) {
    return this.auth.signInWithEmailAndPassword(email, password);
  }

  signUpWithEmail(email: string, password: string) {
    return this.auth.createUserWithEmailAndPassword(email, password)
  }

  getUser() {
    return this.auth.currentUser
  }

  logout() {
    return this.auth.signOut();
  }
}
