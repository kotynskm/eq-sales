import { Component } from '@angular/core';
import { DataService } from '../data.service';
import { Horse } from 'horse.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent {
  constructor(private dataService: DataService, private router: Router) {}

  horseListings?: any;

  // ngOnInit() {
  //   this.allListings = this.dataService.getAllHorses();
  // }

  loadAllHorses() {
    const horses = this.dataService.getAllHorses();
    this.dataService.updateCurrentHorses(horses);
    this.router.navigate(['/search/allhorses']);
  }
}
