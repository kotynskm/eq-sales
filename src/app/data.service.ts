import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Horse } from 'horse.model';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(private fbs: AngularFirestore, private auth: AuthService) {}

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
            image: data.image,
            userID: data.userID,
          };
          horseArr.push(horseObj);
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
      query = query.where('age', '==', parseInt(searchValues.age));
    }

    if (searchValues.discipline !== '') {
      query = query.where('discipline', '==', searchValues.discipline);
    }

    if (searchValues.price !== '') {
      query = query.where('price', '==', parseInt(searchValues.price));
    }
    // firebase querying does not allow multiple queries with >=/<=
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
          image: data.image,
          userID: data.userID,
        };
        horseArr.push(horseObj);
      });
    });
    return horseArr;
  }

  createHorseDocument(createValues: {
    age: number;
    price: number;
    discipline: string;
    height: number;
    name: string;
    description: string;
    location: string;
    breed: string;
    image: string;
  }) {
    // get current user id
    const userID = this.auth.getUser();
    let horseObj: Horse;

    horseObj = {
      name: createValues.name,
      age: createValues.age,
      height: createValues.height,
      discipline: createValues.discipline,
      location: createValues.location,
      breed: createValues.breed,
      price: createValues.price,
      description: createValues.description,
      image: createValues.image,
      userID: userID,
    };

    if (userID) {
      this.fbs
        .collection('horses')
        .add(horseObj)
        .then((docRef) => {
          console.log('Document written with ID: ', docRef.id);
        })
        .catch((error) => {
          console.error('Error adding document: ', error);
        });
    } else {
      console.error('User not signed in.');
    }
  }

  getHorsesByUserID(userID: string) {
    let horseObj: Horse;
    let horseArr: Horse[] = [];
    let query: any = this.fbs.collection('horses').ref;

    query = query.where('userID', '==', userID);

    query.get().then((querySnapshot: any[]) => {
      querySnapshot.forEach((doc) => {
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
          image: data.image,
          userID: data.userID,
        };
        horseArr.push(horseObj);
      });
    });
    return horseArr;
  }
}
