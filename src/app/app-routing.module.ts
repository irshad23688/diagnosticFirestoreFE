/**
* Ionic 4 Firebase Email Auth
*
* Copyright © 2019-present Enappd. All rights reserved.
*
* This source code is licensed as per the terms found in the
* LICENSE.md file in the root directory of this source tree.
*/
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', loadChildren: './login/login.module#LoginPageModule' },
  { path: 'signup', loadChildren: './signup/signup.module#SignupPageModule' },
  { path: 'forgot', loadChildren: './forgot/forgot.module#ForgotPageModule' },
  { path: 'home', loadChildren: './home/home.module#HomePageModule' },
  { path: 'services', loadChildren: './services/services.module#ServicesPageModule' },
  { path: 'appointment', loadChildren: './appointment/appointment.module#AppointmentPageModule' },
  { path: 'add-appointment', loadChildren: './appointment/add-appointment/add-appointment.module#AddAppointmentPageModule' },
  { path: 'locations', loadChildren: './locations/locations.module#LocationsPageModule' },
  { path: 'labsregister', loadChildren: './labsregister/labsregister.module#LabsregisterPageModule' },
  { path: 'lab-master', loadChildren: './lab-master/lab-master.module#LabMasterPageModule' },
  { path: 'paytmtest', loadChildren: './paytmtest/paytmtest.module#PaytmtestPageModule' },
  { path: 'new-registered-lab', loadChildren: './registered-labs-list/registered-labs-list.module#RegisteredLabsListPageModule' },
  { path: 'payment-success', loadChildren: './payment-success/payment-success.module#PaymentSuccessPageModule' },
  { path: 'payment-failure', loadChildren: './payment-failure/payment-failure.module#PaymentFailurePageModule' },
  { path: 'registered-labs-list', loadChildren: './registered-labs-list/registered-labs-list.module#RegisteredLabsListPageModule' },


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
