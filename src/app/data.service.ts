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

          // access specific fields on the document and create horse object
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

  getHorsesByFilter(searchValues: {
    age: string;
    price: string;
    discipline: string;
    height: string;
  }): any {
    let horseObj: Horse;
    let horseArr: Horse[] = [];
    let query: any = this.fbs.collection('horses').ref;

    // apply filters based on search values
    if (searchValues.age !== '') {
      let ageRange = searchValues.age.split('-');
      console.log('AGE RANGE', ageRange);
      query = query
        .where('age', '>=', parseInt(ageRange[0]))
        .where('age', '<=', parseInt(ageRange[1]));
    }

    if (searchValues.discipline !== '') {
      query = query.where('discipline', '==', searchValues.discipline);
    }

    if (searchValues.price !== '') {
      let priceRange = searchValues.price.split('-');
      query = query
        .where('price', '>=', parseInt(priceRange[0]))
        .where('price', '<=', parseInt(priceRange[1]));
    }

    if (searchValues.height !== '') {
      let heightRange = searchValues.height.split('-');
      query = query
        .where('height', '>=', heightRange[0])
        .where('height', '<=', heightRange[1]);
    }

    // final query
    query.get().then((querySnapshot: any[]) => {
      querySnapshot.forEach((doc) => {
        const data: any = doc.data();
        console.log('Document data:', data);
        // access specific fields on the document and create horse object
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
        horseArr.push(horseObj);
        console.log('HORSE ARRAY,', horseArr);
      });
    });
    return horseArr;
  }
}
