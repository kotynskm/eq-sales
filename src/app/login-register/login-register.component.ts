import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login-register',
  templateUrl: './login-register.component.html',
  styleUrls: ['./login-register.component.css'],
})
export class LoginRegisterComponent {
  constructor(private authService: AuthService) {}

  loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });

  signInUser() {
    const email = this.loginForm.value.email || '';
    const password = this.loginForm.value.password || '';
    this.authService.login(email, password);
  }

  registerUser() {
    const email = this.loginForm.value.email || '';
    const password = this.loginForm.value.password || '';
    this.authService.register(email, password);
  }
}
