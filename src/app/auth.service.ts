import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private auth: AngularFireAuth, private router: Router) {}
  user!: Object | null;
  loggedInStatus = new BehaviorSubject<boolean>(false);

  login(email: string, password: string) {
    this.auth
      .signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // Signed in
        this.setLoggedIn(true);
        this.user = userCredential.user;
        console.log(this.user);
        this.router.navigate(['/landing-page']);
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  }

  register(email: string, password: string) {
    this.auth
      .createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // Signed in
        this.setLoggedIn(true);
        this.user = userCredential.user;
        console.log(this.user);
        this.router.navigate(['/landing-page']);
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  }

  logout() {
    this.setLoggedIn(false);
    this.router.navigate(['/']);
    return this.auth.signOut();
  }

  isLoggedIn(): boolean {
    if (this.user) {
      console.log('user is logged in');
      return true;
    } else {
      console.log('user is logged out');
      this.router.navigate(['/']);
      return false;
    }
  }

  setLoggedIn(value: boolean) {
    return this.loggedInStatus.next(value);
  }
}
