import { Component, ViewChild } from '@angular/core';
import { DataService } from '../data.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent {
  constructor(private dataService: DataService, private router: Router) {}

  horseListings?: any;
  @ViewChild('searchForm') searchForm?: NgForm;

  loadAllHorses() {
    const horses = this.dataService.getAllHorses();
    this.dataService.updateCurrentHorses(horses);
    this.router.navigate(['/search/allhorses']);
  }

  onSubmit() {
    const horses = this.dataService.getHorsesByFilter(this.searchForm?.value);
    this.dataService.updateCurrentHorses(horses);
    this.router.navigate(['/search/allhorses']);
  }
}
