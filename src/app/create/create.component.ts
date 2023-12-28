import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DataService } from '../data.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
})
export class CreateComponent {
  constructor(private dataService: DataService) {}
  @ViewChild('createForm') createForm?: NgForm;

  onSubmit() {
    this.dataService.createHorseDocument(this.createForm?.value);
  }
}
