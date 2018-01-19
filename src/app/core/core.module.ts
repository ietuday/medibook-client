import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { SharedModule } from './shared.module';

import { TopnavComponent } from './components/topnav/topnav.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { LayoutComponent } from './components/layout/layout.component';
import { LoadingBarComponent } from './components/loading-bar/loading-bar.component';
import { LoadingBarService, LoadingInterceptor } from './components/loading-bar/loading-bar.service';
import { ApiService } from './services/api.service';
import { ExceptionService } from './services/exception.service';
import { AppStorage } from './services/app-storage.service';
import { EndpointService } from './config/api.config';


@NgModule({
  declarations: [
    TopnavComponent,
    SidenavComponent,
    LayoutComponent,
    LoadingBarComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule,
    SharedModule
  ],
  exports: [SharedModule],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true },
    LoadingBarService,
    ApiService,
    ExceptionService,
    AppStorage,
    EndpointService]
})
export class CoreModule { }
