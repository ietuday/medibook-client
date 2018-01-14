import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './../../core/components/layout/layout.component';


const routes: Routes = [
  {
    path: 'settings',
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
export class SettingsRoutingModule { }
