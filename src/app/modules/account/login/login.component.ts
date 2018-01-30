import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormArray, Validators, FormBuilder } from '@angular/forms';
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
  form:FormGroup
  loginFormData : Login = new Login();

  constructor(private router : Router, private endpointService: EndpointService, private api:ApiService) {

   }

  ngOnInit() {
    this.form = new FormGroup({
    email: new FormControl('', [Validators.required,Validators.email]),
    password: new FormControl('', Validators.required)
  });
  }


  onLogin(){
    const apiParams = {
      data: {
            'data':this.form.value
      }
    };

    this.api
      .request('LOGIN',apiParams)
      .subscribe(res => {
        let that = this;
            if(res.status){
              swal({
                title: 'Good job!',
                text:'You have successfully looged In.!',
                type:'success'
              }).then(function () {
                  that.router.navigate(['/']);
                })
            }else{
              swal({
                title: 'Oops...',
                text: res.errors,
                type: 'error'
              })
            }
          });
  }
}
