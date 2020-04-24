import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { AngularFireDatabase } from '@angular/fire/database';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-new-lab',
  templateUrl: './new-lab.page.html',
  styleUrls: ['./new-lab.page.scss'],
})
export class NewLabPage implements OnInit {
  private addService : FormGroup;
  categoryRef:any;
  categoryData;
  categories;
  showForm=false;
  constructor( private formBuilder: FormBuilder, 
    private af: AngularFireDatabase,
    private loadingCtrl: LoadingController ) {
    this.categoryRef = this.af.list('/NewLabs');

      this.present();
  }

  async present() {
    
    return await this.loadingCtrl.create({
      // duration: 5000,
    }).then(a => {
      a.present().then(() => {
          this.categoryData = this.categoryRef.valueChanges();
          this.categoryData.subscribe(res=>{
          this.categories= res;
          console.log(res);
          a.dismiss().then(() => console.log('abort presenting'));

    })
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
      'createdDate': this.formatDate(dates).toString(),
      'name':this.addService.value.name
    };
    console.log("ser", serviceList)

    this.categoryRef.push(serviceList).then((res)=>{
      console.log("ser", res)
      this.showForm=false;
    });
  }

}

