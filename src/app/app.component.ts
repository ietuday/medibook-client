import { Component } from '@angular/core';

@Component({
  selector: 'medi-app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'MediBook';
  constructor(){
    console.log("Inside Appcomponent");
  }
}
