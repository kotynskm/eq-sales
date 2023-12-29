import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Horse } from 'horse.model';
import { DataService } from '../data.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css'],
})
export class AccountComponent {
  constructor(
    private authService: AuthService,
    private dataService: DataService
  ) {}

  user: any;
  userHorses?: Horse[];

  ngOnInit() {
    this.user = this.authService.getUser();
    this.userHorses = this.dataService.getHorsesByUserID(this.user.uid);
  }

  updateHorse(id: any) {}

  async deleteHorse(id: any) {
    // await the result of delete, so that userHorses is updated when the promise returns
    await this.dataService.deleteHorse(id);
    // (otherwise this line of code will execute immediately and horses will not be updated with the new data)
    this.userHorses = this.dataService.getHorsesByUserID(this.user.uid);
  }

  // updateEmail() {
  //   this.authService.updateEmail();
  // }
}
