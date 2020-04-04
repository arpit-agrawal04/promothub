import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { OwnerService } from 'app/services/owner.service';

@Component({
    selector: 'app-staff-cmp',
    moduleId: module.id,
    templateUrl: 'staff.component.html'
})

export class StaffComponent implements OnInit {
    StaffForm = new FormGroup({
        email: new FormControl(null, [Validators.email]),
        idCard: new FormControl(null, [Validators.required, Validators.minLength(12), Validators.maxLength(12)]),
       phone: new FormControl(null, [Validators.required]),
       fName: new FormControl(null, [Validators.required]),
       lName: new FormControl(null, [Validators.required]),
       add: new FormControl(null, [Validators.required]),
       city: new FormControl(null, [Validators.required]),
       country: new FormControl(null, [Validators.required]),
       zipCode: new FormControl(null, [Validators.required]),
       about: new FormControl(null, [Validators.required]),
       compnyID: new FormControl(null),
       type: new FormControl(null)
     }
     )
    tab1: boolean;
    staffArray: any;
    editTab: boolean;
    disable: boolean;
    ngOnInit() {
        this.tab1 = true;
        this.editTab = false;
    }
    constructor(private ownerService: OwnerService) {

    }
    editStaff(email) {
        const data = {
            email: email
        }
        this.ownerService.getStaffComp(data).subscribe(res => {
            console.log(res)
            this.editTab = true;
            this.StaffForm.setValue(res.message)
        })

    }
    activeTab(tabId) {
        this.editTab = false;
        if (tabId === 'add') {
            this.tab1 = true;
        } else {
            this.tab1 = false
            this.getCompleteStaffDetails()
        }


    }
    getCompleteStaffDetails() {
        this.ownerService.getCompleteStaffDetails({}).subscribe(res => {
            console.log(res);
            this.staffArray = res.message

        })
    }
    getBasicInfo() {
        this.ownerService.getBasicAdd().subscribe(res => {
            console.log(res);

        })


    }

    get control  () {
        return  this.StaffForm.controls;
        }
        SignStaffUser() {
          this.StaffForm.markAllAsTouched();
          this.disable = true;
           console.log(this.StaffForm  )
          if (this.StaffForm.valid) {
            this.ownerService.SignStaffUser(this.StaffForm.value).subscribe(res => {
                this.StaffForm.reset()
                this.disable = false;
            })
          }
        }
        UpdateStaffUser() {
            this.StaffForm.markAllAsTouched();
            this.disable = true;
             console.log(this.StaffForm  )
            if (this.StaffForm.valid) {
              this.ownerService.UpdateStaffUser(this.StaffForm.value).subscribe(res => {
                  this.StaffForm.reset()
                  this.disable = false;
                  this.editTab = false;
              })
            }
        }
}
