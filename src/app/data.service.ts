import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(private http: HttpClient) {}

  baseUrl: string = 'https://elevated-web-351500-default-rtdb.firebaseio.com/';

  getAllHorses() {
    return this.http.get(this.baseUrl).subscribe((data) => {
      console.log(data);
    });
  }
}
