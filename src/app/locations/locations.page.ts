import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFireDatabase } from '@angular/fire/database';
import { LoadingController, ToastController } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/auth';
import { CrudRepositoryService } from '../_service/crud-repository.service';
declare var swal :any

@Component({
  selector: 'app-locations',
  templateUrl: './locations.page.html',
  styleUrls: ['./locations.page.scss'],
  encapsulation: ViewEncapsulation.None

})
export class LocationsPage implements OnInit {
  private labService : FormGroup;
  locationRef:any;
  userId: any;
  locationData;
  locations;
  showForm=false;
  showMessage=true;
  constructor( private formBuilder: FormBuilder, private crudRepo: CrudRepositoryService, 
              private loadingCtrl: LoadingController,public toastCtrl: ToastController,public af: AngularFireAuth ) {
    // this.locationRef = this.fb.list('/locations');
      this.present();
  }
   
  async present() {
    
    return await this.loadingCtrl.create({
      // duration: 5000,
    }).then(a => {
      a.present().then(() => {
          // this.locationData = this.locationRef.valueChanges();
          this.crudRepo.getData("locations").subscribe(res=>{
          this.locations= res;
          if(this.locations.length===0){
            this.showMessage=false;
          }else{
            this.showMessage=true;

          }
          console.log(res.length);
          a.dismiss().then(() => console.log('abort presenting'));
    })
          });
      });
    
  }

  async dismiss() {
    return await this.loadingCtrl.dismiss().then(() => console.log('dismissed'));
  }

  ngOnInit() {
    this.labService = this.formBuilder.group({
      name: ['', Validators.required],
      pincode: ['', Validators.compose([Validators.required])],
    });
  }

  addBtn(){
    this.showForm=true;
    this.showMessage= true;
  }

  backBtn(){
     this.showForm=false;
     if(this.locations.length===0){
      this.showMessage=false;
    }else{
      this.showMessage=true;

    }
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
    if(this.labService.invalid){
      return;
    }
    let dates= new Date();
    let serviceList={
      'createdDate': Date.now(),
      'createdId' : this.userId,
      'updatedDate': Date.now(),
      'updatedId' : this.userId,
      'isActive' :true,
      'name':this.labService.value.name,
      'pincode': this.labService.value.pincode
    };
    console.log("ser", serviceList)

    this.crudRepo.create(serviceList,"locations").then((res)=>{
      console.log("ser", res)
      swal.fire('Data Saved successfully');
      this.showForm=false;
      this.labService.reset();
    },error=>{
      swal.fire('Something Went Wrong!');
    });
    
  }
  ionViewWillEnter() {
    if (this.af.auth.currentUser) {
      this.userId = this.af.auth.currentUser.uid;
    }
  }
}