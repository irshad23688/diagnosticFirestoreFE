/**
* Ionic 4 Firebase Email Auth
*
* Copyright © 2019-present Enappd. All rights reserved.
*
* This source code is licensed as per the terms found in the
* LICENSE.md file in the root directory of this source tree.
*/
import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import { AngularFireDatabase, AngularFireObject, AngularFireList } from '@angular/fire/database';
import { IntercomponentService } from '../services/intercomponent.service';
import {Observable, Subject} from 'rxjs';
import {map, switchMap} from 'rxjs/operators';
import { PostService } from '../post.service';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  labMasterRef;
  categoryData;
  labmaster;
  labMasterObservable :Observable<any>;
  htmlToAdd;
  racesCollection: AngularFirestoreCollection<any>
  constructor(public loadingController: LoadingController,private af: AngularFirestore, 
    private router: Router, private interComp: IntercomponentService) { }


  ionViewDidEnter() {
    // this.labMasterRef = this.af.collection('labs').doc('isActive').,ref => ref.orderByChild('isActive').equalTo(true));
    //,ref=>ref.where("isActive", "==",true    )
    this.labMasterRef=this.af.collection('labs',ref=>ref.where("isActive", "==",true)).get();

    
// eturn this.racesCollection.snapshotChanges().map(actions => {       
//   return actions.map(a => {
//     const data = a.payload.doc.data();
//     data.id = a.payload.doc.id;
//     return data;
//   });
// });
//  r
    //this.labMasterRef = this.af.collection('labs').doc('isActive').get();
    this.present();
    }

  async present() {
    this.labmaster=[]
    return await this.loadingController.create({
      // duration: 5000,
    }).then(a => {
      a.present().then(() => {
        this.labMasterRef.subscribe(res=>{
          res.docs.forEach(item=>{

          this.labmaster.push(Object.assign(item.data(),{key:item.id}));
          console.log(this.labmaster);

          })
          a.dismiss().then(() => console.log('abort presenting'));
        });
          });
      });
    
  }

  async dismiss() {
    return await this.loadingController.dismiss().then(() => console.log('dismissed'));
  }

bookNow(list){
  console.log("list",list);
  this.interComp.sendLabList(list);
  this.router.navigate(['/add-appointment'])
 // var paytm_config = require('../../../functions/src/index').paytm_config;


  
    }
   
}



