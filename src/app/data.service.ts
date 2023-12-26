import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(private fbs: AngularFirestore) {}

  getData() {
    const data = this.fbs
      .collection('horses')
      .get()
      .subscribe((querySnapshot) =>
        querySnapshot.docs.forEach((doc) => {
          const data: any = doc.data();

          //access specific fields on the document
          const name = data.name;

          console.log('NAME IS: ', name);
        })
      );
  }
}
