import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { OwnerService } from 'app/services/owner.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-allorder-cmp',
    moduleId: module.id,
    templateUrl: 'allOrder.component.html'
})

export class AllOrderComponent implements OnInit {
    OrderArray: any = [];

    ngOnInit() {


        this.GetAllOrders()
    }
constructor(private ownerService: OwnerService, private route: Router, private toastr: ToastrService) {

}
GetAllOrders() {
    this.ownerService.GetAllOrders({}).subscribe(res => {
        if (res.success) {
            this.OrderArray = res.message;
        }

    })
}
editOrder(orderId) {
    this.route.navigateByUrl('/owner/editOrder/' + orderId)

}
showNotification(from, align, color) {


    this.toastr.success( '<span data-notify="icon" class="nc-icon nc-bell-55"></span><span data-notify="message"> <b></b>Order Deleted with <b>Oder ID:' + color + '</b></span>',
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
deleteOrder(orderId) {
    const data = {
        orderId: orderId
    }
   this.ownerService.deleteOrder(data).subscribe(res => {
    this.showNotification('top', 'right', orderId)
    this.GetAllOrders()

   })
}
}
