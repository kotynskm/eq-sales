import { Component } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css'],
})
export class AccountComponent {
  constructor(private authService: AuthService) {}

  user: any;

  ngOnInit() {
    this.user = this.authService.getUser();
  }

  // updateEmail() {
  //   this.authService.updateEmail();
  // }
}
