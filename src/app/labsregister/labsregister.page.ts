import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AngularFireDatabase } from '@angular/fire/database';
import { Router } from '@angular/router';
import { CrudRepositoryService } from '../_service/crud-repository.service';
declare var swal :any;
@Component({
  selector: 'app-labsregister',
  templateUrl: './labsregister.page.html',
  styleUrls: ['./labsregister.page.scss'],
})
export class LabsregisterPage implements OnInit {
  labsignup: FormGroup;
  labsignupdetails:any;
  constructor(public formBuilder: FormBuilder,private crudRepo: CrudRepositoryService, 
              public router : Router) { 
    // this.labsignupdetails=this.afd.list('/labsignup')
    }

  ngOnInit() {
    this.labsignup=this.formBuilder.group({
      labname:['',Validators.required],
      email:['',[Validators.required, Validators.email, Validators.pattern('[A-Z0-9a-z._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,64}')]],
      address:['',Validators.required],
      city:['',Validators.required],
      state:['',Validators.required],
      pincode:['',Validators.required],
      personName:['',Validators.required],
      mobileNumber:['',Validators.required]
    });
  }
  onSubmit(){
    let signupSucess = Object.assign(this.labsignup.value,this.updateDateAndUser());
    this.crudRepo.create(signupSucess,"labsignup").then(res=>{
      swal.fire('Data Saved successfully');
      this.labsignup.reset();
      this.router.navigate(['']);
    })
    // this.labsignupdetails.push(signupSucess);
  
}
onCancel(){  
   this.router.navigate(['']);
}
updateDateAndUser(){
  let updateDateUser=
   {
   'createdDate': Date.now(),
    'updatedDate': Date.now(),
    'isActive' :true,
    'status':'Pending'
   }
   return updateDateUser;
 
 }
}
