import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import {UserService} from '../../services/user.service';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';



@Component({
    selector: 'app-signup-cmp',
    moduleId: module.id,
    templateUrl: 'signup.component.html'
})

export class SignUpComponent {
  signupForm = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
   website: new FormControl(null, [Validators.required]),
   compny: new FormControl(null, [Validators.required]),
   fName: new FormControl(null, [Validators.required]),
   dryClean: new FormControl(false ),
   washFold: new FormControl(false ),
   ironFold: new FormControl(false ),
   washIron: new FormControl(false ),
   lName: new FormControl(null, [Validators.required]),
   add: new FormControl(null, [Validators.required]),
   city: new FormControl(null, [Validators.required]),
   country: new FormControl(null, [Validators.required]),
   zipCode: new FormControl(null, [Validators.required]),
   about: new FormControl(null, [Validators.required]),
   password: new FormControl('', [Validators.required, Validators.minLength(6)]),
   cPassword: new FormControl('', [Validators.required, Validators.minLength(6) ]),
 } , this.checkPasswords
 )
  res: any;
 checkPasswords(group: FormGroup) { // here we have the 'passwords' group
  const pass = group.get('password').value;
  const confirmPass = group.get('cPassword').value;

  return pass === confirmPass ? null : { notSame: true };
}
  constructor(private toastr: ToastrService, private userService: UserService, private router: Router  ) {}
  get control  () {
  return  this.signupForm.controls;
  }
  SignUser() {
    this.signupForm.markAllAsTouched();
     console.log(this.signupForm  )
    if (this.signupForm.valid) {
      this.userService.signUp(this.signupForm.value).subscribe(result => {
       this.res = result;
        if (this.res.success === true) {
          this.showNotification('top', 'right', 2)
        this.router.navigateByUrl('/login')
        } else {
          this.showNotification('top', 'right', 3)
        }
      })
    }
  }
  showNotification(from, align, color) {

    switch (color) {
      case 1:
        this.toastr.info(
        '<span data-notify="icon" class="nc-icon nc-bell-55"></span><span data-notify="message">Welcome to <b>Paper Dashboard Angular</b> - a beautiful bootstrap dashboard for every web developer.</span>',
          "",
          {
            timeOut: 4000,
            closeButton: true,
            enableHtml: true,
            toastClass: "alert alert-info alert-with-icon",
            positionClass: "toast-" + from + "-" + align
          }
        );
        break;
      case 2:
        this.toastr.success(
          '<span data-notify="icon" class="nc-icon nc-bell-55"></span><span data-notify="message"> <b>' + this.signupForm.value.email  + '</b> Has been successfully registered</span>',
          "",
          {
            timeOut: 4000,
            closeButton: true,
            enableHtml: true,
            toastClass: "alert alert-success alert-with-icon",
            positionClass: "toast-" + from + "-" + align
          }
        );
        break;
      case 3:
        this.toastr.warning(
        '<span data-notify="icon" class="nc-icon nc-bell-55"></span><span data-notify="message"><b>' + this.signupForm.value.email  + '</b> Already exsists </span>',
          "",
          {
            timeOut: 4000,
            closeButton: true,
            enableHtml: true,
            toastClass: "alert alert-warning alert-with-icon",
            positionClass: "toast-" + from + "-" + align
          }
        );
        break;
      case 4:
        this.toastr.error(
        '<span data-notify="icon" class="nc-icon nc-bell-55"></span><span data-notify="message">Welcome to <b>Paper Dashboard Angular</b> - a beautiful bootstrap dashboard for every web developer.</span>',
          "",
          {
            timeOut: 4000,
            enableHtml: true,
            closeButton: true,
            toastClass: "alert alert-danger alert-with-icon",
            positionClass: "toast-" + from + "-" + align
          }
        );
        break;
      case 5:
        this.toastr.show(
        '<span data-notify="icon" class="nc-icon nc-bell-55"></span><span data-notify="message">Welcome to <b>Paper Dashboard Angular</b> - a beautiful bootstrap dashboard for every web developer.</span>',
          "",
          {
            timeOut: 4000,
            closeButton: true,
            enableHtml: true,
            toastClass: "alert alert-primary alert-with-icon",
            positionClass: "toast-" + from + "-" + align
          }
        );
        break;
      default:
        break;
    }
  }
}
