import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class CrudRepositoryService {

  constructor(private firestore: AngularFirestore) { }

  create(data,tableName) {
    // return new Promise<any>((resolve, reject) =>{
    //     this.firestore
    //         .collection(tableName)
    //         .add(data)
    //         .then(res => {}, err => reject(err));
    // });
   return this.firestore.collection(tableName).add(data);
}
getData(tableName) { 
  return this.firestore.collection(tableName).valueChanges();
}
update(key,data,tableName) {
  return this.firestore
      .collection(tableName)
      .doc(key)
      .set(data);
}
}
