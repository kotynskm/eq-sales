import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent {
  constructor(private authService: AuthService) {}

  isLoggedIn = false;
  subscription?: Subscription;

  ngOnInit() {
    this.subscription = this.authService.loggedInStatus.subscribe(
      (status) => (this.isLoggedIn = status)
    );
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }
}
