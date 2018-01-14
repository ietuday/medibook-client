import { Component, OnInit } from '@angular/core';
import { Login } from '../../../core/models/login.modal';
import { Router } from '@angular/router';

import swal from 'sweetalert2'

@Component({
  selector: 'erp-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginFormData : Login = new Login();

  constructor(private router : Router) { }

  ngOnInit() {
  }


  onLogin(){
    swal({
        position: 'center',
        type: 'success',
        title: 'Successfully Logged In',
        showConfirmButton: false,
        timer: 1000
      })
      this.router.navigate(['/']);
  }
}
