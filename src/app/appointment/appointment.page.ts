import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { LoadingController } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/auth';
import { CrudRepositoryService } from '../_service/crud-repository.service';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.page.html',
  styleUrls: ['./appointment.page.scss'],
})
export class AppointmentPage implements OnInit {
  public appointmentList;
  tableData;
  showMsg=true;
  constructor(public afd:AngularFirestore, private loadingCtrl: LoadingController, private crudRepo: CrudRepositoryService,
              private af: AngularFireAuth) { 
  }

  ngOnInit() {
    // this.appointmentList= this.af.list('/bookings');
  
    this.present();
  }
  
  
async present() {
  // this.appointmentList=[];
  return await this.loadingCtrl.create({
  }).then(a => {
    console.log('a');
    a.present().then(() => {
      if (this.af.auth.currentUser) {
        // this.userId = this.af.auth.currentUser.uid;
        // console.log(this.userId);
        var ref= this.afd.collection('users').doc(this.af.auth.currentUser.uid);
        let getDoc = ref.get().subscribe(doc => {
      if (!doc.exists) {
        console.log('No such document!');
      } else {
        this.afd.collection("bookings",ref=>ref.where("createdId","==",this.af.auth.currentUser.uid)).valueChanges().subscribe(res=>{
          let temp;
          this.tableData=[];

          res.forEach(item=>{
                temp = item;
                 this.tableData.push(temp);
                // this.showMsg=true;
          });
          if(this.tableData.length===0){
            this.showMsg=true;
          }else{
            this.showMsg=false;
          }
            a.dismiss().then(() => console.log('abort presenting'));

        });
      }
    });
  
      }





  //       if (this.afd.auth.currentUser) {
  //         // this.crudRepo.getData("bookings")
  //         this.af.collection('/bookings',ref=>ref.where("createdId","==",this.afd.auth.currentUser.uid)).snapshotChanges().subscribe(res=>{
  //          console.log(res);
  //         //  this.appointmentList=res;
  //         //  console.log(this.appointmentList);
  //         this.showMsg=false;
  //          res.forEach(item => {
  //           //  let temp = item.payload.val();
  //            // this.discountedPrice= temp.value;
  //           //  console.log('temp', temp)
  //           //  temp["$key"] = item.payload.key;
  //           //  this.tableData.push(temp);
  //            this.showMsg=true;
  //           });
  //           a.dismiss().then(() => console.log('abort presenting'));
  //        });
  //  }
        });
    });
}

async dismiss() {
  return await this.loadingCtrl.dismiss().then(() => console.log('dismissed'));
}


}
