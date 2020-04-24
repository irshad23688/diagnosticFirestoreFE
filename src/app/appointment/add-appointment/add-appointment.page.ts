import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireList, AngularFireObject } from '@angular/fire/database';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { WebIntent } from '@ionic-native/web-intent/ngx';
import { Platform } from '@ionic/angular';
import { Observable } from 'rxjs';
import { GetService } from 'src/app/get.service';
import { IntercomponentService } from 'src/app/services/intercomponent.service';
import { CrudRepositoryService } from 'src/app/_service/crud-repository.service';
import { Configuration } from 'src/assets/config';
declare var RazorpayCheckout:any; 
declare var swal:any;
declare var $:any; 

@Component( {
  selector:'app-add-appointment', 
  templateUrl:'./add-appointment.page.html', 
  styleUrls:['./add-appointment.page.scss'], 

})
export class AddAppointmentPage implements OnInit {
  couponValue;
  public minDate:Date = new Date(); 
  addAppointmentForm:FormGroup; 
  appointmentDetails:AngularFireList < any > ; 
  updateSuccessObj:AngularFireObject < any > 
  labAppointmentList:any; 
  labAppointServList:any; 
  appointmentId; 
  labName; 
  servicePrice; 
  transactionId = Math.floor(Math.random() * 90000) + 10000; 
  bookingId = Math.floor(Math.random() * 90000) + 10000; 
  paymentUrl = "upi://pay?";
  paymentDetails;
  userId; 
  bookingMasterObservable:Observable < any > ; 
  paymentRefSuccess; 
  paymentRefFailure; 
  payeeDetails; 
  payeeList; 
  payeeGateway; 
  payeeName; 
  payId; 
  keyId; 
  currency:string = 'INR'; 
  couponTable;
  couponDetails;
  discountedPrice;
  totalPrice;
  discount;
    // paymentAmount:number = 500; 
  // razor_key = 'rzp_test_VOg9sl36SolYNd'; 
  // dummyTest
  // labList: [];
  // labList = ['Lab1', 'Lab2', 'Lab3']; 
  // services=['x-ray','MRI'];
  constructor(public formBuilder:FormBuilder, private afd:AngularFirestore, 
    private webIntent:WebIntent, private af:AngularFireAuth, private crudRepo: CrudRepositoryService,
    private config: Configuration, private interComp:IntercomponentService, private route:Router, private getService : GetService, private platform: Platform, private authaf: AngularFireAuth ) {
    // this.appointmentDetails = this.afd.list('/bookings'); 
    // this.paymentDetails = this.afd.list('/paymentDetails'); 
    // this.payeeDetails = this.afd.list('/config'); 
    // this.dummyTest= this.afd.list('/PaymentSuccess')   
  }

  ngOnInit() {
    // console.log(typeof(this.bookingId));
    this.couponDetails=[];
    this.addAppointmentForm = this.formBuilder.group( {
     name:['', Validators.required], 
      mobileNumber:['', Validators.required], 
      gender:['', Validators.required], 
      services:['', Validators.required], 
      appointDate:['', Validators.required], 
      modeOfPayment:['', Validators.required], 
      coupon:['% Off']
    });
    if (this.af.auth.currentUser) {
      this.userId = this.af.auth.currentUser.uid;
      var ref= this.afd.collection('users').doc(this.userId);
      let getDoc = ref.get().subscribe(doc => {
    if (!doc.exists) {
      console.log('No such document!');
    } else {
      this.afd.collection("coupons",ref=>ref.where("role","==",doc.data().role)).valueChanges().subscribe(res=>{
        let temp;
        res.forEach(item=>{
              temp = item;
              this.couponDetails.push(temp);
              
        });
      });
    }
  });

    }
    // this.payeeDetails.valueChanges().subscribe(data =>  {
    //   this.payeeList = data; 
    //   this.payeeGateway = this.payeeList[0].upi.gateway, 
    //   this.payeeName = this.payeeList[0].upi.name
    //   }); 
    // this.crudRepo.getData("config/merchantDetailsUpi").subscribe(data=>{
    //   console.log(data)
    //   this.payeeList = data; 
    //   this.payeeGateway = this.payeeList[0].gateway, 
    //   this.payeeName = this.payeeList.merchantDetails.upi.name
    // })
    this.afd.collection("config").doc("merchantDetailsUpi").get().subscribe(doc=>{
      if (!doc.exists) {
        console.log('No such document!');
      } else {
        this.payeeList = doc.data(); 
      this.payeeGateway = this.payeeList.gateway, 
      this.payeeName = this.payeeList.name
        // console.log('Document data:', doc.data().gateway);
      }
    })
      // this.updateSuccessObj= this.afd.object("/bookings/"+'-M3VhOj7sfm49xZyOAGa')
      // this.updateSuccessObj.update({'Jugaad':'Cancel'}).then((res)=>{
      //   console.log('Updated')
      // });

}

onSubmit() {
  $('.submitBtnn').attr('disabled','true');
  let discRate;
  if(isNaN((this.servicePrice - (this.servicePrice * this.discountedPrice)))){
        discRate='';
  } else{
    discRate=(this.servicePrice - (this.servicePrice * this.discountedPrice));
  }
      let keyDetails =  {
        labKey:this.appointmentId, 
        labName:this.labName, 
        serviceRate:this.servicePrice,
        discountedRate: discRate,
        bookingId:this.bookingId, 
        status:'Booked', 
        pStatus:'Pending', 
        adminStatus:true,
        appointDate:this.formatDate(this.addAppointmentForm.value.appointDate)
      }
      let newAppointDetails = Object.assign(this.addAppointmentForm.value, keyDetails,this.updateDateAndUser())
      this.crudRepo.create(newAppointDetails,"bookings").then(res =>  {
          this.paymentMethod(); 
       }); 
  }

ionViewDidEnter() {
  this.labAppointmentList = []
    this.interComp.getLabList().subscribe(res =>  {
    this.labAppointmentList.push(res); 
    this.appointmentId = res.key; 
    this.labName = res.labname; 
    this.labAppointServList = res.services;
});
}

displayPrice(event) {
  for (let i = 0; i < this.labAppointServList.length; i++) {
    if(this.labAppointServList[i].service!== undefined){
      if (event.target.value === this.labAppointServList[i].service) {
        this.servicePrice = this.labAppointServList[i].price;
        this.servicePrice= parseInt(this.servicePrice);
  }
    }
    
}
  // this.totalPrice= this.servicePrice - (this.servicePrice*this.discountedPrice);
  // console.log("displ",this.totalPrice,this.servicePrice);
  }

reset() {
    this.addAppointmentForm.reset();
    this.servicePrice='';
  }
cashPaymentJson() {
    let cashJson =  {
        orderId:this.bookingId, 
        adminStatus:true,
        pStatus:'Pending',
        extras:{
          txnId:'', 
          txnRef:'',
          responseCode:'', 
          ApprovalRefNo:'', 
        },        
        modeOfPayment:'Cash', 
        service:this.addAppointmentForm.value.services, 
        amount:this.servicePrice,
    }
    return cashJson; 
  }
upiPaymentJson() {
    let upiJson =  {
      orderId:this.bookingId, 
      modeOfPayment:'UPI', 
      adminStatus:true,
      service:this.addAppointmentForm.value.services, 
      amount:this.servicePrice, 
      // status:'Booked',
      request: {
        txnId:this.transactionId, 
        txnRef:this.userId + this.transactionId, 
        amount:this.servicePrice, 
        currency:'INR', 
        txnName:this.addAppointmentForm.value.services + '' + 'Payment'
      }
  }
  return upiJson; 
  }
  cardPaymentJson() {
    let cardJson =  {
      orderId:this.bookingId, 
      modeOfPayment:'CARD',
      adminStatus:true,
      service:this.addAppointmentForm.value.services, 
      amount:this.servicePrice, 
      // status:'Booked',
      request: {
        txnId:this.transactionId, 
        txnRef:this.userId + this.transactionId, 
        amount:this.servicePrice, 
        currency:'INR', 
        txnName:this.addAppointmentForm.value.services + '' + 'Payment'
      }
  }
  return cardJson; 
  }

onSuccessTxn(status, extras,amount) {
  let payStatus={
    extras: extras,
    status:status,
    payableAmount:amount
  }
    let paymentSucess = Object.assign(payStatus, this.upiPaymentJson(),this.updateDateAndUser());
    this.crudRepo.create(paymentSucess,"paymentDetails").then(res =>  {
            // this.route.navigate(['/appointment'])
            }, error =>  {
              swal.fire('Something Went Wrong'); 
            })
  }

paymentMethod() {
    let amountPayable;
    if(this.totalPrice===undefined){
        amountPayable=this.servicePrice;
    }else{
        amountPayable=this.totalPrice;
    }
    if (this.addAppointmentForm.value.modeOfPayment === 'Cash') {
      let cashPayment = Object.assign(this.cashPaymentJson(),this.updateDateAndUser(),{payableAmount:amountPayable});
      this.crudRepo.create(cashPayment,"paymentDetails").then(res =>  {
          swal.fire('You booking is confirmed. Please pay the amount at diagnostic center')
          // console.log('Res',res.key);
          this.afd.collection('bookings',ref=>ref.where("bookingId", "==",this.bookingId
          )).get().subscribe(res=>{
            res.docs.forEach(item=>{
              this.updateCashDb(item.id,amountPayable);
            });
          
          });
        this.route.navigate(['/appointment'])
        }, error =>  {
          swal.fire('Something Went Wrong'); 
        })
    }else if (this.addAppointmentForm.value.modeOfPayment === 'Card') {
          this.payWithRazor(amountPayable);
    }else {
      
      const options =  {
        action:this.webIntent.ACTION_VIEW, 
        url:this.paymentUrl + 'pa=' + this.payeeGateway + '&pn=' + this.payeeName + '&tid=' + this.transactionId + '&tr=' + this.userId + this.transactionId + '&am=' + amountPayable + '&cu=INR' + '&tn=' + this.addAppointmentForm.value.services + ' ' + 'Payment' + ' ' + this.bookingId
        // upi://pay?pa=aqueelshaikh1992@okhdfcbank&pn=irshad&tid=12Abcdef5895&tr=irshad123&am=150&cu=INR&tn=AppPayment'
      }
      this.webIntent.startActivityForResult(options).then(onSuccess=>{
        this.paymentRefSuccess=onSuccess;
        this.onSuccessTxn(this.paymentRefSuccess.extras.Status,this.paymentRefSuccess.extras,amountPayable);
        this.upiPay(amountPayable);
      },onError=>{
        this.paymentRefFailure=onError;
        this.onSuccessTxn(this.paymentRefFailure.extras.Status,this.paymentRefSuccess.extras,amountPayable);
        let failureMsg={
          extras: this.paymentRefFailure,
          payableAmount:amountPayable
        }
        let paymentFailure= Object.assign(failureMsg,this.upiPaymentJson(), this.updateDateAndUser())
        this.crudRepo.create(paymentFailure,"paymentDetails").then(res=>{
          this.route.navigate(['/payment-failure']);
          },error=>{
            swal.fire('Something Went Wrong');
          });
      });
      
    }
    
  } 

  upiPay(amountPayable){
    this.afd.collection('bookings',ref=>ref.where("bookingId", "==",this.bookingId
          )).get().subscribe(res=>{
            res.docs.forEach(item=>{
              if(this.paymentRefSuccess.extras.Status==='SUCCESS'){
                this.updateUpiDb(this.paymentRefSuccess.extras.Status,this.paymentRefSuccess.extras,item.id,amountPayable);
                this.route.navigate(['/payment-success']);
              } else{
                this.updateUpiDb(this.paymentRefSuccess.extras.Status,this.paymentRefSuccess.extras,item.id,amountPayable);
                this.route.navigate(['/payment-failure']);
              }
            })
            
          });
  }
 updateDb(reponseStatus,key,amount){
   let coupons;
   if(this.discount===undefined){
    coupons='';
   } else{
    coupons=this.discount + "% Off";
   }
    this.afd.collection("bookings").doc(key).set({
      pStatus:reponseStatus, 
      extras:{
        txnId: this.payId
    },
    payableAmount:amount,
    coupon: coupons 
    },{merge:true});
 }

 updateUpiDb(status,extras,key,am){
  let coupons;
  if(this.discount===undefined){
   coupons='';
  } else{
   coupons=this.discount + "% Off";
  }
  this.afd.collection("bookings").doc(key).set({
    pStatus:status, 
    extras:extras,
    payableAmount:am,
    coupon: coupons 
  },{merge:true});
 }
 updateCashDb(key,amountPayable){
  let coupons;
  if(this.discount===undefined){
   coupons='';
  } else{
   coupons=this.discount + "% Off";
  }
  this.afd.collection("bookings").doc(key).set({
    extras:{
      txnId:'', 
      txnRef:'',
      responseCode:'', 
      ApprovalRefNo:'', 
    },
    payableAmount:amountPayable,
    coupon: coupons
  },{merge:true});
      
 }
//  checkcndition(orderid):Promise<any>{
//    = 
 
 
// }

// getSnapshot(uid) {
//   var ref = this.afd.collection('bookings').doc(orderId).collection('bookingId');
//   return ref.snapshotChanges().pipe(map(actions => {
//     return actions.map(item => {
//       return { id: item.payload.doc.id, ...item.payload.doc.data() }
//     });
//   }));
// }

formatDate(date) {
  var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

  if (month.length < 2) 
      month = '0' + month;
  if (day.length < 2) 
      day = '0' + day;

  return [year, month, day].join('-');
}
payWithRazor(am) {
  var options = {
    // description: 'Credits towards consultation',
    // image: 'https://i.imgur.com/3g7nmJC.png',
    currency: this.currency, // your 3 letter currency code
    key: this.config.secretId, // your Key Id from Razorpay dashboard
    amount: am*100, // Payment amount in smallest denomiation e.g. cents for USD
    notes: {
      booking_Id: this.bookingId,
      name: 'Sonigra'
    },
    prefill: {
      // email: 'aqueelshaikh1992@gmail.com ',
      contact: this.addAppointmentForm.value.mobileNumber,
      name: this.addAppointmentForm.value.name
    },
    theme: {
      color: '#F37254'
    },
    modal: {
      ondismiss: function () {
      }
    }
  };
  var successCallback = (payment_id) => { // <- Here!
    this.successCallback(payment_id,am);
  };
  
  var cancelCallback = (error) => { // <- Here!
    // alert(error.description + ' (Error ' + error.code + ')');
  };
  
  this.platform.ready().then(() => {
    RazorpayCheckout.open(options, successCallback, cancelCallback);
  })
}
successCallback(payment_id,am) {
  this.payId=payment_id; 
  if(payment_id){
    this.afd.collection('bookings',ref=>ref.where("bookingId", "==",this.bookingId)).get().subscribe(res=>{
      res.docs.forEach(item=>{
        this.updateDb('SUCCESS',item.id,am);
      });
     });
    this.cardPayment('SUCCESS');
    this.route.navigate(['/payment-success']);
  }else{
    this.afd.collection('bookings',ref=>ref.where("bookingId", "==",this.bookingId)).get().subscribe(res=>{
      
      res.docs.forEach(item=>{
        this.updateDb('FAILURE',item.id,am);
      });
});
    this.cardPayment('FAILURE');
    this.route.navigate(['/payment-failure']);
  }
  this.getService.getPaymentDetails(payment_id).subscribe(res=>{
    // this.dummyTest.push(res);
  })
}
cardPayment(status){
  let payStatus={
    status: status
  }
  let paymentSucess = Object.assign(payStatus, this.cardPaymentJson(),this.updateDateAndUser());
  this.crudRepo.create(paymentSucess,"paymentDetails").then(res =>  {
            // this.route.navigate(['/appointment'])
            }, error =>  {
              swal.fire('Something Went Wrong'); 
            })
}

updateDateAndUser(){
 let updateDateUser=
  {
    'createdDate': Date.now(),
    'createdId' : this.userId,
    'updatedDate': Date.now(),
    'updatedId' : this.userId,
    'isActive' :true
  }
  return updateDateUser;
}

couponChange(event){
  console.log(event.target.value)
 this.discount=event.target.value;
 this.discountedPrice= event.target.value;
 this.discountedPrice= this.discountedPrice/100;
 this.totalPrice= this.servicePrice - (this.servicePrice*this.discountedPrice);
 console.log(this.totalPrice)

}
}
