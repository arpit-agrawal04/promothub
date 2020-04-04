import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import {  Router } from '@angular/router';
import { DeliveryService } from 'app/services/delivery.service';

@Component({
    selector: 'app-deliveryreached-cmp',
    moduleId: module.id,
    templateUrl: 'deliveryReached.component.html'
})

export class DeliveryReachedComponent implements OnInit {
    orderForm = new FormGroup({
       phone: new FormControl(null, [Validators.required]),
       fName: new FormControl(null, [Validators.required]),
       dryClean: new FormControl(false ),
       washFold: new FormControl(false ),
       ironFold: new FormControl(false ),
       washIron: new FormControl(false ),
       lName: new FormControl(null, [Validators.required]),
       remark: new FormControl(null, [Validators.required]),
       orderId: new FormControl(null),
     }
     )
     dryCleanForm = new FormGroup({
       clothCount: new FormControl(null, [Validators.required]),
       clothWeight: new FormControl(null, [Validators.required]),
     })
     washFoldForm = new FormGroup({
      clothCount: new FormControl(null, [Validators.required]),
      clothWeight: new FormControl(null, [Validators.required]),
    })
    ironFoldForm = new FormGroup({
      clothCount: new FormControl(null, [Validators.required]),
      clothWeight: new FormControl(null, [Validators.required]),
    })
    washIronForm = new FormGroup({
      clothCount: new FormControl(null, [Validators.required]),
      clothWeight: new FormControl(null, [Validators.required]),
    })
    data: any;
    value: { city: any; country: any; zipCode: any;  fName?: any;
        lName?: any;
        add?: any};
    date: string;
    DisableSubmit: boolean;
    suggestivePhoneArray: any = [];
    readOnly: boolean;
  orderType: string;
  canUpdate: boolean;
    ngOnInit() {

        console.log( );
        if (this.route.url.toString().split('/')[3]) {
            this.infoToEditOrder(this.route.url.toString().split('/')[3])
        } else {
          this.route.navigateByUrl('/delivery/deliveryTask')
        }

    }
    constructor(private deliveryService: DeliveryService, private toastr: ToastrService,
        private route: Router) {


    }
    infoToEditOrder(orderId) {
      const  data = {orderId: orderId}
      this.deliveryService.deliveryBoyReached(data).subscribe(res => {
          if (res.success) {
              this.readOnly = true
              console.log(res.message)
              if (res.message.status) {
                this.orderType = 'delivery'
                delete res.message.status
                this.orderForm.setValue(res.message);

              } else {
                this.orderType = 'pickup'
                this.orderForm.setValue(res.message);
              }

          }
      })
    }
    showNotification(from, align, color) {


            this.toastr.success(
              '<span data-notify="icon" class="nc-icon nc-bell-55"></span><span data-notify="message"> <b></b>Order successfully Pickup <b>Oder ID:' + color + '</b></span>',
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
          // this.orderForm.markAllAsTouched();
          //  console.log(this.orderForm  )
          if (this.orderForm.valid) {
            this.canUpdate = true;
              if (this.orderForm.value.dryClean) {
                this.dryCleanForm.markAllAsTouched()
                if (!this.dryCleanForm.valid) {
                  this.canUpdate = false;
                } else {
                  this.orderForm.value.dryCleanOrder = this.dryCleanForm.value;
                }
              }
              if (this.orderForm.value.washIron) {
                this.washFoldForm.markAllAsTouched()
                if (!this.washIronForm.valid) {
                  this.canUpdate = false;
                } else {
                  this.orderForm.value.washIronOrder = this.washIronForm.value;
                }
              }
              if (this.orderForm.value.washFold) {
                this.washFoldForm.markAllAsTouched()
                if (!this.washFoldForm.valid) {
                  this.canUpdate = false;
                } else {
                  this.orderForm.value.washFoldOrder = this.washFoldForm.value;
                }
              }
              if (this.orderForm.value.ironFold) {
                this.ironFoldForm.markAllAsTouched()
                console.log(this.ironFoldForm.controls)
                if (!this.ironFoldForm.valid) {
                  this.canUpdate = false;
                } else {
                  this.orderForm.value.ironFoldOrder = this.ironFoldForm.value;
                }
              }
              if (this.canUpdate) {
                this.DisableSubmit = true;
                this.deliveryService.deliveryUpdate(this.orderForm.value).subscribe(res => {
                  if (this.readOnly) {
                      this.route.navigateByUrl('/delivery/deliveryTask')
                      this.showNotification('top', 'right', this.orderForm.value.orderId)
                  } else {
                      this.showNotification('top', 'right', res.message)
                  }


              })
              }

          }
        }
}
