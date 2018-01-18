import { Component, OnInit } from '@angular/core';
import { Login } from '../../../core/models/login.model';
import { Router } from '@angular/router';
import { EndpointService } from '../../../core/config/api.config' ;
import { ApiService, ApiParam } from '../../../core/services/api.service';
import swal from 'sweetalert2'

@Component({
  selector: 'erp-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginFormData : Login = new Login();

  constructor(private router : Router, private endpointService: EndpointService, private api:ApiService) {

   }

  ngOnInit() {
  }


  onLogin(){
    const apiParams = {
      data: {
            'data':this.loginFormData
      }
    };

    this.api
      .request('LOGIN',apiParams)
      .subscribe(res => {
              console.log("Successfully Logged In")
      });
    swal({
        position: 'center',
        type: 'success',
        title: 'Successfully Logged In',
        showConfirmButton: false,
        timer: 1000
      })
      // this.router.navigate(['/']);
  }
}
