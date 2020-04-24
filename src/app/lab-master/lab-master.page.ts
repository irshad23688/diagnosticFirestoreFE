import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { ModalController } from '@ionic/angular';
// import { LabServiceMasterPage } from '../lab-service-master/lab-service-master.page';
import { IntercomponentService } from '../services/intercomponent.service';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { CrudRepositoryService } from '../_service/crud-repository.service';
declare var swal:any;
@Component({
  selector: 'app-lab-master',
  templateUrl: './lab-master.page.html',
  styleUrls: ['./lab-master.page.scss'],
})
export class LabMasterPage implements OnInit {
  services: FormArray;
  serviceList;
  labsignup: FormGroup;
  showPricing= true;
  locationList;
  pushFormData;
  userId;
  responseInterComp;
  constructor(public formBuilder: FormBuilder, private crudRepo: CrudRepositoryService,
    public modalController: ModalController, private interComponent: IntercomponentService,
    private router: Router, public authaf: AngularFireAuth) { }

  ngOnInit() {
    // this.pushFormData= this.afd.list('/labs');
    this.crudRepo.getData("services").subscribe(res=>{
      console.log(res);
      this.serviceList=res;
    },error=>{
      console.log(error);
      swal.fire('Something went wrong!');
    })
    this.crudRepo.getData("locations").subscribe(res=>{
      this.locationList=res;
      console.log(res);
    },error=>{
      console.log(error);
        swal.fire('Something went wrong!');
      })

    //console.log(this.serviceList);
    this.labsignup=this.formBuilder.group({
      labname:['',Validators.required],
      email:['',[Validators.required, Validators.email, Validators.pattern('[A-Z0-9a-z._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,64}')]],
      address:['',Validators.required],
      city:['',Validators.required],
      state:['',Validators.required],
      pincode:['',Validators.required],
      personname:['',Validators.required],
      mobilenumber:['',Validators.required],
      // price:['',Validators.required],
      // service:['',Validators.required],
      area:['',Validators.required],
      services: this.formBuilder.array([ this.createItem() ])

    })
  }
  reset(){
    this.labsignup.reset();
    this.showPricing=true;
  }
  openPrice(e){
    console.log(e);
    this.showPricing=false;
  }
  createItem(): FormGroup {
    return this.formBuilder.group({
      service:['', Validators.required],
      price:['',Validators.required],
      
    });
  }
  addItem(){
    this.services = this.labsignup.get('services') as FormArray;
    this.services.push(this.createItem());
  }
  removeItem (index){
    (this.labsignup.get('services') as FormArray).removeAt(index);

  }
  onSubmit(){
    if(this.labsignup.invalid){
      return;
    }
    this.responseInterComp=Object.assign(this.labsignup.value,{'createdDate': Date.now(),
    'createdId' : this.userId,
    'updatedDate': Date.now(),
    'updatedId' : this.userId,
    'isActive' :true,
  });
  console.log(this.responseInterComp);
  this.crudRepo.create(this.responseInterComp,"labs").then(res=>{ 
      swal.fire('Saved successfully!');
      this.router.navigate(['/home']);
      this.labsignup.reset();
    },error=>{
      swal.fire('Something Went Wrong!');
    })
  }
  ionViewWillEnter(){
    if (this.authaf.auth.currentUser) {
      this.userId = this.authaf.auth.currentUser.uid;
    }
    this.interComponent.getMessage().subscribe(res=>{
      this.responseInterComp=res;
      console.log("check",res);
    })
  }
 
}

