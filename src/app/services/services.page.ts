import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { AngularFireDatabase } from '@angular/fire/database';
import { LoadingController } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/auth';
import { CrudRepositoryService } from '../_service/crud-repository.service';

@Component({
  selector: 'app-services',
  templateUrl: './services.page.html',
  styleUrls: ['./services.page.scss'],
})
export class ServicesPage implements OnInit {
  private addService : FormGroup;
  categoryRef:any;
  categoryData;
  categories;
  showForm=false;
  userId: any;
  constructor( private formBuilder: FormBuilder, private crudRepo: CrudRepositoryService,
     private loadingCtrl: LoadingController,public authF: AngularFireAuth
      ) {
    // this.categoryRef = this.af.list('/services');
      this.present();
  }

  async present() {
    
    return await this.loadingCtrl.create({
      // duration: 5000,
    }).then(a => {
      a.present().then(() => {
        this.crudRepo.getData("services").subscribe(res=>{
          this.categories= res;
          console.log(this.categories)
          a.dismiss().then(() => console.log('abort presenting'));
        });
    //       this.categoryData = this.categoryRef.valueChanges();
    //       this.categoryData.subscribe(res=>{
    //       this.categories= res;
    //       console.log(res);
    //       a.dismiss().then(() => console.log('abort presenting'));

    // })
          });
      });
    
  }

  async dismiss() {
    return await this.loadingCtrl.dismiss().then(() => console.log('dismissed'));
  }




  ngOnInit() {
    this.addService = this.formBuilder.group({
      name: ['', Validators.required],
      // description: [''],
    });
   
  }

  addBtn(){
      this.showForm=true;
  }
  backBtn(){
    this.showForm=false;
    this.addService.reset();
  }
 formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [day, month, year].join('-');
}
  logForm(){
    if(this.addService.invalid){
      return;
    }
    let dates= new Date();
    let serviceList={
      'createdDate': Date.now(),
      'createdId' : this.userId,
      'updatedDate': Date.now(),
      'updatedId' : this.userId,
      'isActive' :true,
      'name':this.addService.value.name
    };
    console.log("ser", serviceList)
    this.crudRepo.create(serviceList,"services").then(res=>{
      this.addService.reset();
      this.showForm=false;
    })
    // this.categoryRef.push(serviceList).then((res)=>{
    //   this.addService.reset();
    //   this.showForm=false;
    // });
  }
  ionViewWillEnter() {
    if (this.authF.auth.currentUser) {
      this.userId = this.authF.auth.currentUser.uid;
    }
  }
}