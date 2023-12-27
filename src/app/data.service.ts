import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Horse } from 'horse.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(private fbs: AngularFirestore) {}

  sourceDataHorses = new BehaviorSubject<Horse[]>([]);
  currentHorses = this.sourceDataHorses.asObservable();

  updateCurrentHorses(horses: Horse[]) {
    this.sourceDataHorses.next(horses);
  }

  getAllHorses(): Horse[] {
    let horseObj: Horse;
    let horseArr: Horse[] = [];
    const data = this.fbs
      .collection('horses')
      .get()
      .subscribe((querySnapshot) =>
        querySnapshot.docs.forEach((doc) => {
          const data: any = doc.data();

          //access specific fields on the document and create horse object
          horseObj = {
            name: data.name,
            age: data.age,
            height: data.height,
            discipline: data.discipline,
            location: data.location,
            breed: data.breed,
            id: doc.id,
            price: data.price,
            description: data.description,
          };
          console.log(doc);

          horseArr.push(horseObj);
          console.log(horseArr);
        })
      );
    return horseArr;
  }
}
