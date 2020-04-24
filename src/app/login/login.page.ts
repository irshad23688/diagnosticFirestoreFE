/**
* Ionic 4 Firebase Email Auth
*
* Copyright © 2019-present Enappd. All rights reserved.
*
* This source code is licensed as per the terms found in the
* LICENSE.md file in the root directory of this source tree.
*/
import {Component }from '@angular/core'; 
import {AlertController, Platform }from '@ionic/angular'; 
import {LoadingController, ToastController }from '@ionic/angular'; 
import {Router }from '@angular/router'; 
import {AngularFireAuth }from '@angular/fire/auth'; 

@Component( {
  selector:'app-login', 
  templateUrl:'./login.page.html', 
  styleUrls:['./login.page.scss'], 

})
export class LoginPage {
  email:string = ''; 
  password:string = ''; 
  error:string = ''; 
  subscribe:any; 
  constructor(private fireauth:AngularFireAuth, 
    private router:Router, 
    private platform:Platform, 
    private toastController:ToastController, 
    public loadingController:LoadingController, 
    public alertController:AlertController) {

      this.subscribe = this.platform.backButton.subscribeWithPriority(666666, () =>  {
        if(this.constructor.name==="LoginPage"){
          if(window.confirm('Do you want to exit app!')){
            navigator["app"].exitApp();
          }
        }
      })
  }

  async openLoader() {
    const loading = await this.loadingController.create( {
      message:'Please Wait ...', 
      duration:2000
    }); 
    await loading.present(); 
  }
  async closeLoading() {
    return await this.loadingController.dismiss(); 
  }

  login() {
    this.openLoader(); 
    this.fireauth.auth.signInWithEmailAndPassword(this.email, this.password)
      .then(res =>  {
        if (res.user) {
          //console.log(res.user);
          localStorage.setItem("uid", res.user.uid); 
        //  this.router.navigate(['/home']);
        }
        this.closeLoading(); 
      })
      .catch(err =>  {
        console.log(`login failed $ {err}`); 
        this.error = err.message; 
        this.closeLoading(); 
      }); 
  }

  async presentToast(message, show_button, position, duration) {
    const toast = await this.toastController.create( {
      message:message, 
      showCloseButton:show_button, 
      position:position, 
      duration:duration
    }); 
    toast.present(); 
  }

}
