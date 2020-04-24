import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { RegisteredLabsListPage } from './registered-labs-list.page';

const routes: Routes = [
  {
    path: '',
    component: RegisteredLabsListPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [RegisteredLabsListPage]
})
export class RegisteredLabsListPageModule {}
