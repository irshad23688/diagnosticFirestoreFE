import { Component, OnInit } from '@angular/core';
import { PostService } from '../post.service';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
// import * as paytm_checksum from '../../paytm/checksum';

// declare var paytm : any;
// var paytm_checksum = require('../../paytm/checksum');
// declare var paytm_checksum : any; 
import { WebIntent } from '@ionic-native/web-intent/ngx';
import { AngularFireDatabase } from '@angular/fire/database';

@Component({
  selector: 'app-paytmtest',
  templateUrl: './paytmtest.page.html',
  styleUrls: ['./paytmtest.page.scss'],
})
export class PaytmtestPage implements OnInit {
  htmlToAdd;
  paymentRefSuccess;
  paymentRefFailure;
  constructor(private postService: PostService, private iab: InAppBrowser, private webIntent: WebIntent, private afd: AngularFireDatabase) { }

  ngOnInit() {
    let testingJson={
      "Name":'Aqueel',
      "ENVIRONMENT" : "staging", 
      "REQUEST_TYPE": "DEFAULT", // You would get this details from paytm after opening an account with them
      "MID": "KjBxhB90684156906802", // You would get this details from paytm after opening an account with them
      "ORDER_ID": "ORDER0000000001", // Unique ID for each transaction. This info is for you to track the transaction details
      "CUST_ID": "10000988111", // Unique ID for your customer
      "INDUSTRY_TYPE_ID": "Retail", // You would get this details from paytm after opening an account with them
      "CHANNEL_ID": "WAP", // You would get this details from paytm after opening an account with them
      "TXN_AMOUNT": "1", // Transaction amount that has to be collected
      "WEBSITE": "WEBSTAGING", // You would get this details from paytm after opening an account with them
      "CALLBACK_URL": "https://securegw.paytm.in/theia/paytmCallback?ORDER_ID=ORDER0000000001", // Callback url
      "EMAIL": "aqueelshaikh@outlook.com", // Email of customer
      "MOBILE_NO": "9999999999", // Mobile no of customer
      // "CHECKSUMHASH": this.htmlToAdd
      "CHECKSUMHASH": "w2QDRMgp1/BNdEnJEAPCIOmNgQvsi+BhpqijfM9KvFfRiPmGSt3Ddzw+oTaGCLneJwxFFq5mqTMwJXdQE2EzK4px2xruDqKZjHupz9yXev4="

    }
    this.paymentRefSuccess= this.afd.list('/PaymentSuccess')
    this.paymentRefFailure= this.afd.list('/PaymentFailure')
    // paytm.startPayment(testingJson, this.successCallback, this.failureCallback);

    // this.postService.postMessage(testingJson).subscribe(res=>{
    //   const pageContent='data:text/html:base64,'+ btoa(res)
    //   // this.setSlideHtml(pageContent)
    //   document.write(res)
    //   // window.open((res), '_blank');
    //   console.log(res)
    //   // window.open(res,"_self")
  
    // },error=>{    
    //   console.log(error)
    // })
  }
  successCallback(response) {
    console.log("res",response)
    if (response.STATUS == "TXN_SUCCESS") {
        var txn_id = response.TXNID;
        var paymentmode = response.PAYMENTMODE;
        // other details and function after payment transaction
    } else {
        // error code will be available in RESPCODE
        // error list page https://docs.google.com/spreadsheets/d/1h63fSrAmEml3CYV-vBdHNErxjJjg8-YBSpNyZby6kkQ/edit#gid=2058248999
        alert("Transaction Failed for reason " + response.RESPMSG);
    }
}

upi(){
  console.log('clicked')
  const options={
    action:this.webIntent.ACTION_VIEW,
    url:'upi://pay?pa=aqueelshaikh1992@okhdfcbank&pn=irshad&tid=12Abcdef5895&tr=irshad123&am=150&cu=INR&tn=AppPayment'
  }
  this.webIntent.startActivityForResult(options).then(onSuccess=>{

    alert(onSuccess);
    this.paymentRefSuccess.push(onSuccess)
  },onError=>{
    this.paymentRefFailure.push(onError)

  })
}


 failureCallback(error) {
    // error code will be available in RESCODE
    // error list page https://docs.google.com/spreadsheets/d/1h63fSrAmEml3CYV-vBdHNErxjJjg8-YBSpNyZby6kkQ/edit#gid=2058248999
    alert("Transaction Failed for reason " + error.RESPMSG);
}
  donate(paypal) {
    document.getElementById("formtesting").innerHTML="maybe...";
    document[paypal].action = "https://us-central1-diagnosticappbe.cloudfunctions.net/donate";
    document[paypal].submit();
    document.getElementById("formtesting").innerHTML="did it work?";
    }
  
}
// function 