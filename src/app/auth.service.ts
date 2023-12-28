import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { verifyBeforeUpdateEmail } from 'firebase/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private auth: AngularFireAuth, private router: Router) {}
  user: any;
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
      return false;
    }
  }

  setLoggedIn(value: boolean) {
    return this.loggedInStatus.next(value);
  }

  getUser() {
    return this.user;
  }

  // TODO:
  // updateEmail() {
  //   this.auth.user.pipe(take(1)).subscribe((user) => {
  //     if (user) {
  //       verifyBeforeUpdateEmail(user, 'test@gmail.com')
  //         .then(() => {
  //           console.log('email updated');
  //         })
  //         .catch((err) => {
  //           console.log('error: ', err);
  //         });
  //     } else {
  //       // user not found handle as needed
  //       console.log('user not found');
  //     }
  //   });
  // }
}
