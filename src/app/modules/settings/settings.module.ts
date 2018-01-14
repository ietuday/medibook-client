import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreModule } from './../../core/core.module';
import { SettingsRoutingModule } from './settings-routing.module';

@NgModule({
  imports: [
    CommonModule,
    CoreModule,
    SettingsRoutingModule
  ],
  declarations: []
})
export class SettingsModule { }
