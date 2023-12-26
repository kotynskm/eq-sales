import { Component } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css'],
})
export class LandingPageComponent {
  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.dataService.getData();
  }
}
