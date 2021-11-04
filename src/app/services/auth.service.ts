import {
  getAuth,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
} from '@angular/fire/auth';
import { Injectable } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { idToken } from 'rxfire/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private firestore: Firestore, private router: Router) {}

   auth = getAuth(this.firestore.app);
  register(email: string, password: string) {
    createUserWithEmailAndPassword(this.auth, email, password)
      .then((userCredential) => {
        const reg = userCredential.user;
        console.log(reg);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
    onAuthStateChanged(this.auth, (user) => {
      if (user) {
        this.router.navigateByUrl('h');
      }
    });
  }
  login(email: string, password: string) {
    signInWithEmailAndPassword(this.auth, email, password )
      .then((userCredential) => {
        const log = userCredential.user;
        const id =userCredential.providerId;
        console.log(id)
        console.log(log)
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
      onAuthStateChanged(this.auth, (user) => {
        if (user) {
          this.router.navigateByUrl('h');
        }
      });
  }

  isauth(): any {
    onAuthStateChanged(this.auth, (user) => {
      if (user) {
        return true;
      }
      else {return false;}
    });
  }
}
