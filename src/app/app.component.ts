/**
* Ionic 4 Firebase Email Auth
*
* Copyright © 2019-present Enappd. All rights reserved.
*
* This source code is licensed as per the terms found in the
* LICENSE.md file in the root directory of this source tree.
*/
import { Component, ViewEncapsulation, ViewChild } from '@angular/core';

import { Platform, IonRouterOutlet } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { AngularFireDatabase } from '@angular/fire/database';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  encapsulation:ViewEncapsulation.None
})
export class AppComponent {
  navigate : any;
  @ViewChild(IonRouterOutlet) routerOutlet: IonRouterOutlet;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private fireauth: AngularFireAuth,
    private router: Router,
    public db: AngularFireDatabase
  ) {
    this.initializeApp();
    //this.sideMenu();
    //this.sideAdminMenu();
  }
   

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleLightContent();
      this.splashScreen.hide();
      this.fireauth.auth.onAuthStateChanged((user) => {
        if (user) {
         // this.user = user;
          console.log("Useeeeeeeeeeeeeeee1111111111");
          console.log(user.uid);
          this.db.object('/users/' + user.uid).valueChanges().subscribe((res: any) => {
            console.log(res.role);
            if (res.role == "Admin") {
              this.router.navigate(['/registered-labs-list']);
              //localStorage.setItem('uid', success.uid)  
              this.sideAdminMenu();
            } else {
              this.sideMenu();
              this.router.navigate(['/appointment']);
              //this.toastr.error('Login Failed!', 'You are not an ADMIN!');
            }
          })
        }
      })
    });
  }
  
  sideMenu()
  {
    this.navigate =
    [
      {
        title : "Home",
        url   : "/home",
        icon  : "home"
      },
      {
        title : "Appointments",
        url   : "/appointment",
        icon  : "list-box"
      },
      {
        title : "Chat",
        url   : "/chat",
        icon  : "chatboxes"
      },
      {
        title : "Contacts",
        url   : "/contacts",
        icon  : "contacts"
      },
    ]
  }

  sideAdminMenu()
  {
    this.navigate =
    [
      {
        title : "Home",
        url   : "/home",
        icon  : "home"
      }, 
      {
        title : "Services",
        url   : "/services",
        icon  : "list"
      },
      {
        title : "Locations",
        url   : "/locations",
        icon  : "list"
      },
      {
        title : "Labs",
        url   : "/lab-master",
        icon  : "list-box"
      },
      {
         title : "New Registered Labs",
         url   : "/new-registered-lab",
         icon  : "list-box"
       },
      {
        title : "Appointments",
        url   : "/appointment",
        icon  : "list-box"
      }
    ]
  }


  logout() {
    this.fireauth.auth.signOut();
    localStorage.removeItem("uid");
    this.router.navigate(['/login']);
  }

  isLoggedin() {
    return localStorage.getItem("uid") != null;
  }

  ngOnInit(){
    
  }
}
