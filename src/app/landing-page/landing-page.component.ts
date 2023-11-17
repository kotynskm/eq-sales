import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { DataService } from '../data.service';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css'],
})
export class LandingPageComponent {
  constructor(
    private authService: AuthService,
    private router: Router,
    private dataService: DataService
  ) {}

  saleHorses = [];

  ngOnInit() {
    this.dataService.getAllHorses();
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }
}
