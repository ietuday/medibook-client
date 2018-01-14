import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './core/components/layout/layout.component';

import { DashboardModule } from './modules/dashboard/dashboard.module';
import { UsersModule } from './modules/users/users.module';
import { SettingsModule } from './modules/settings/settings.module';
import { AccountModule } from './modules/account/account.module';
// import { StudentsModule } from './modules/students/students.module';
const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    // children: [
    //   {
    //     path: 'studentss',
    //     loadChildren: () => StudentsModule
    //   },
    //   {
    //     path: '',
    //     component: LayoutComponent
    //   },
    //   {
    //     path: '',
    //     component: LayoutComponent
    //   },
    //   {
    //     path: '',
    //     component: LayoutComponent
    //   },
    // ]
  },
];

@NgModule({
  imports: [
    DashboardModule,
    // StudentsModule,
    UsersModule,
    SettingsModule,
    AccountModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ],
  declarations: []
})
export class AppRoutingModule { }
