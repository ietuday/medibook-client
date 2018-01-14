import { Component, OnInit } from '@angular/core';
import { Login } from '../../../core/models/login.modal';

@Component({
  selector: 'erp-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginFormData : Login = new Login();
  
  constructor() { }

  ngOnInit() {
  }

}
