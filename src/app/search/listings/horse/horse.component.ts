import { Component, Input } from '@angular/core';
import { Horse } from 'horse.model';

@Component({
  selector: 'app-horse',
  templateUrl: './horse.component.html',
  styleUrls: ['./horse.component.css'],
})
export class HorseComponent {
  @Input('horse') horse!: Horse;
}
