import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormArray, Validators, FormBuilder } from '@angular/forms';
import {fadeInAnimation} from '../../../route.animation';
import {Router} from '@angular/router';
import { EndpointService } from '../../../core/config/api.config' ;
import { ApiService, ApiParam } from '../../../core/services/api.service';
import { Register } from '../../../core/models/register.model';
import { matchOtherValidator } from '../../../core/custom-validation/equal-validator.directive';
import swal from 'sweetalert2'

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
      password: new FormControl('', [Validators.required,Validators.minLength(4)]),
      passwordConfirm: new FormControl('', [Validators.required,Validators.minLength(4),matchOtherValidator('password')]),
    });
  }


  getErrorMessage(value){
      switch(value){

        case "name":
            return this.form.controls['name'].hasError('required') ? 'You must enter your name' : '';
        case "userType":
               return this.form.controls['userType'].hasError('required') ? 'User Type cannot be empty' : '';
        case "email":
          return this.form.controls['email'].hasError('required') ? 'You must enter a value' :
          this.form.controls['email'].hasError('email') ? 'Not a valid email' : '';

        case "password":
        return this.form.controls['password'].hasError('required') ? 'You must enter a password' :
        this.form.controls['email'].hasError('minLength') ? 'Password must have 4 character length' : '';

        case "passwordConfirm":
        return this.form.controls['passwordConfirm'].hasError('required') ? 'You must enter a password' :
        this.form.controls['passwordConfirm'].hasError('matchOtherValidator') ? 'Confirm Password does not match with Password' : '';

        default:
            console.log("Something error")
      }
  }

  register() {
    const apiParams = {
      data: {
          'data' : this.form.value
      }
    };
    this.api
    .request('REGISTER',apiParams)
    .subscribe(res =>{
      let that = this;
      if(res.status){
        swal({
          title: 'Congrats',
          text:'You have successfully Registered into Medicare',
          type:'success'
        }).then(function () {
            that.router.navigate(['/']);
        })
      } else if(!res.status){
        swal({
          title: 'Oops...',
          text: res.errors,
          type: 'error'
        })
      }else{
        swal({
          title: 'Oops...',
          text: 'something went wrong',
          type: 'error'
        })
      }
    });
  }
}
