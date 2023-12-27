import { Component } from '@angular/core';
import { Horse } from 'horse.model';
import { DataService } from 'src/app/data.service';

@Component({
  selector: 'app-listings',
  templateUrl: './listings.component.html',
  styleUrls: ['./listings.component.css'],
})
export class ListingsComponent {
  constructor(private dataService: DataService) {}
  horses?: Horse[];

  ngOnInit() {
    this.dataService.currentHorses.subscribe((horses) => {
      this.horses = horses;
    });
  }
}
