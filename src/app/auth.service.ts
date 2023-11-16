import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private auth: AngularFireAuth, private router: Router) {}
  user!: Object | null;
  loggedIn = false;

  login(email: string, password: string) {
    this.auth
      .signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // Signed in
        this.user = userCredential.user;
        this.router.navigate(['/landing-page']);
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  }

  register() {}

  logout() {
    return this.auth.signOut();
  }

  isLoggedIn(): boolean {
    if (this.user) {
      return true;
    } else {
      this.router.navigate(['/']);
      return false;
    }
  }
}
