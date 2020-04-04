import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import {UserService} from '../../services/user.service';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';



@Component({
    selector: 'app-login-cmp',
    moduleId: module.id,
    templateUrl: 'login.component.html'
})

export class LoginComponent implements OnInit {
  loginForm = new FormGroup({
   userId: new FormControl(null, [Validators.required, Validators.email]),
   password: new FormControl(null, [Validators.required])
 }
 )
  showInvalid: boolean;
  res: any;
  constructor(private toastr: ToastrService, private userService: UserService, private router: Router) {}
  ngOnInit() {
    localStorage.clear()
  }
  get control  () {
  return  this.loginForm.controls;
  }
  loginUser() {
    this.loginForm.markAllAsTouched();
    this.showInvalid = false;
    // console.log(this.loginForm.controls  )
    if (this.loginForm.valid) {
      this.userService.loginUser(this.loginForm.value).subscribe(result => {
        this.res = result
        console.log(result);
        if (this.res.success) {
          localStorage.setItem('token', this.res.message.token);
          localStorage.setItem('type', this.res.message.type);
          localStorage.setItem('name', this.res.message.fName);
          localStorage.setItem('company', this.res.message.compny);
          localStorage.setItem('id', this.loginForm.value.userId);
          this.router.navigateByUrl('/' + this.res.message.type)
        } else {
          this.showInvalid = true;
        }
      })
    }
  }
}
