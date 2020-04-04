import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { OwnerService } from 'app/services/owner.service';
import { ToastrService } from 'ngx-toastr';
import { RouterStateSnapshot, Router } from '@angular/router';

@Component({
    selector: 'app-addorder-cmp',
    moduleId: module.id,
    templateUrl: 'addOrder.component.html'
})

export class AddOrderComponent implements OnInit {
    orderForm = new FormGroup({
       phone: new FormControl(null, [Validators.required]),
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
       remark: new FormControl(null, [Validators.required]),
       deliveryBoy: new FormControl(null, [Validators.required]),
       pickupDate: new FormControl(null, [Validators.required]),
       pickupTime: new FormControl(null, [Validators.required]),
       orderId: new FormControl(null),
     }
     )
    data: any;
    value: { city: any; country: any; zipCode: any;  fName?: any;
        lName?: any;
        add?: any};
    date: string;
    DisableSubmit: boolean;
    suggestivePhoneArray: any = [];
    readOnly: boolean;
    ngOnInit() {

        console.log( );
        if (this.route.url.toString().split('/')[3]) {
            this.infoToEditOrder(this.route.url.toString().split('/')[3])
        } else {
            this.readOnly = false;
            this.date = new Date().toISOString()
            this.orderForm.controls.pickupDate.setValue(this.date.split('T')[0])
            this.getBasicInfo()
        }

    }
    constructor(private ownerService: OwnerService, private toastr: ToastrService,
        private route: Router) {


    }
    infoToEditOrder(orderId) {
      const  data = {orderId: orderId}
      this.ownerService.infoToEditOrder(data).subscribe(res => {
          if (res.success) {
              this.readOnly = true
              console.log(res.message)
              this.orderForm.setValue(res.message.formData);
              this.data = res;
          }
      })
    }
    fillValue(customer) {
        this.suggestivePhoneArray = []
        this.orderForm.controls.city.setValue(customer.city)
        this.orderForm.controls.phone.setValue(customer.phone)
        this.orderForm.controls.country.setValue(customer.country)
        this.orderForm.controls.zipCode.setValue(customer.zipCode)
        this.orderForm.controls.add.setValue(customer.add)
        this.orderForm.controls.fName.setValue(customer.fName)
        this.orderForm.controls.lName.setValue(customer.lName)
    }
    findCustomer() {
        const data = {
            regex: '^' + this.orderForm.controls.phone.value
        }
        if (data.regex.length > 5) {
            this.ownerService.findCustomer(data).subscribe(res => {
                this.suggestivePhoneArray = res.message;
                console.log(this.suggestivePhoneArray);

            })
        }
    }
    getBasicInfo() {
        this.ownerService.getBasicAdd().subscribe(res => {
            console.log(res);
            this.data = res
            if (this.data.success) {
                this.value = {
                    city: this.data.message.city,
                    country: this.data.message.country,
                    zipCode: this.data.message.zipCode,
                }
                this.orderForm.controls.city.setValue(this.data.message.city)
                this.orderForm.controls.country.setValue(this.data.message.country)
                this.orderForm.controls.zipCode.setValue(this.data.message.zipCode)
            }

        })


    }
    showNotification(from, align, color) {


            this.toastr.success(
              '<span data-notify="icon" class="nc-icon nc-bell-55"></span><span data-notify="message"> <b></b>Order successfully added with <b>Oder ID:' + color + '</b></span>',
              '',
              {
                timeOut: 4000,
                closeButton: true,
                enableHtml: true,
                toastClass: 'alert alert-success alert-with-icon',
                positionClass: 'toast-' + from + '-' + align
              }
            );
      }
    get control  () {
        return  this.orderForm.controls;
        }
        SignUser() {
          this.orderForm.markAllAsTouched();
           console.log(this.orderForm  )
          if (this.orderForm.valid) {
              this.DisableSubmit = true;
            this.ownerService.addOrder(this.orderForm.value).subscribe(res => {
                if (this.readOnly) {
                    this.route.navigateByUrl('/owner/orderList')
                } else {
                    this.DisableSubmit = false;
                    this.orderForm.reset();
                    this.orderForm.controls.pickupDate.setValue(this.date.split('T')[0])
                    console.log(res);
                    this.showNotification('top', 'right', res.message)
                }


            })
          }
        }
}
