import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormArray, Validators, FormBuilder } from '@angular/forms';
import {fadeInAnimation} from '../../../route.animation';
import {Router} from '@angular/router';
import { EndpointService } from '../../../core/config/api.config' ;
import { ApiService, ApiParam } from '../../../core/services/api.service';
import { Register } from '../../../core/models/register.model';
import { matchOtherValidator } from '../../../core/custom-validation/equal-validator.directive';
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
  form:FormGroup
  registerformData : Register = new Register();
  userTypes = [
    {value: 'patient', viewValue: 'Patient'},
    {value: 'doctor', viewValue: 'Doctor'},
  ];

  constructor(
    private router: Router,
    private endpointService: EndpointService,
    private api:ApiService
  ) { }

  ngOnInit() {
      this.form = new FormGroup({
      name: new FormControl('', Validators.required),
      userType: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required,Validators.email]),
      password: new FormControl('', Validators.required),
      passwordConfirm: new FormControl('', [Validators.required,matchOtherValidator('password')]),
    });
  }

  register() {
    this.registerformData.userType = this.form.value.userType;
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
    this.router.navigate(['/']);
  }

}
