import { Component, OnInit } from '@angular/core';
import {fadeInAnimation} from '../../../route.animation';
import {Router} from '@angular/router';
import { EndpointService } from '../../../core/config/api.config' ;
import { ApiService, ApiParam } from '../../../core/services/api.service';
import { Register } from '../../../core/models/register.model';
@Component({
  selector: 'ms-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  host: {
    '[@fadeInAnimation]': 'true'
  },
  animations: [ fadeInAnimation ]
})
export class RegisterComponent implements OnInit {
  registerformData : Register = new Register();

  constructor(
    private router: Router,
    private endpointService: EndpointService,
    private api:ApiService
  ) { }

  ngOnInit() {
  }

  register(value) {
    console.log("Form Value",value);
    console.log("Register Data",this.registerformData);
    const apiParams = {
      data: {
          'data' : this.registerformData
      }
    };

    this.api
    .request('REGISTER',apiParams)
    .subscribe(res =>{
      console.log("Register Successfully",res)
    });
    // this.router.navigate(['/']);
  }

}
