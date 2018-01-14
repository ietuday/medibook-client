import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreModule } from './../../core/core.module';
import { UsersRoutingModule } from './users-routing.module';
import { routedComponents } from './users-routing.module';

@NgModule({
  imports: [
    CommonModule,
    CoreModule,
    UsersRoutingModule
  ],
  declarations: [routedComponents],
})
export class UsersModule { }
