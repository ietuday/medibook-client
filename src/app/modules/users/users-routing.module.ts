import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './../../core/components/layout/layout.component';

import { UserListComponent } from './user-list/user-list.component'


const routes: Routes = [
  {
    path: 'users',
    component: LayoutComponent,
    // children: [
    //   {
    //     path: '',
    //     component:
    //   }
    // ]
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class UsersRoutingModule { }

export const routedComponents = [
  UserListComponent
];
