import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  constructor(private authService: AuthService) {}

  isLoggedIn = false;
  subscription?: Subscription;

  logout() {
    this.authService.logout();
  }

  ngOnInit() {
    // subscribe to changes in loggedInStatus
    this.subscription = this.authService.loggedInStatus.subscribe((status) => {
      this.isLoggedIn = status;
    });
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }
}
