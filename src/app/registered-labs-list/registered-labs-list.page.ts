import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { CrudRepositoryService } from '../_service/crud-repository.service';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-registered-labs-list',
  templateUrl: './registered-labs-list.page.html',
  styleUrls: ['./registered-labs-list.page.scss'],
})
export class RegisteredLabsListPage implements OnInit {
  registeredList: AngularFireList<any>;
  cardData;
  statusArray;
  registeredLabs: Observable<any>;
  updateSuccessObj;
  keyId;
  constructor(public af:AngularFirestore, private loadingCtrl: LoadingController, private crudRepo: CrudRepositoryService) { }

  ngOnInit() {
    // this.registeredList= this.af.list('/labsignup');
    this.present();
  }
  async present() {
    this.cardData=[];
    return await this.loadingCtrl.create({
    }).then(a => {
      a.present().then(() => {
        this.af.collection("labsignup").get().subscribe((res)=>{  
          res.docs.forEach(item=>{
            this.cardData.push(Object.assign(item.data(),{key:item.id}))
            a.dismiss().then(() => console.log('abort presenting'));
          });     
         });
          });
      });
  }
  
  async dismiss() {
    return await this.loadingCtrl.dismiss().then(() => console.log('dismissed'));
  }
  formatDate(datFormat){
    var d = new Date(datFormat),
    month = '' + (d.getMonth() + 1),
    day = '' + d.getDate(),
    year = d.getFullYear();

if (month.length < 2) 
    month = '0' + month;
if (day.length < 2) 
    day = '0' + day;

return [year, month, day].join('-');  
}
dropDownList(status){
    this.statusArray=[];
    this.statusArray.push(status,'Completed','Cancelled');
return status;
}
selectedList(event){
  this.af.collection("labsignup").doc(this.keyId).update({status:event.target.value}).then(res=>{
      this.present();
  });
 
}
cardClick(e){
  this.keyId=e;
}

}