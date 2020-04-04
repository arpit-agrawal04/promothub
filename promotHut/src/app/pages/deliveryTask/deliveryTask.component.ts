import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DeliveryService } from 'app/services/delivery.service';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
    selector: 'app-deliverytask.-cmp',
    moduleId: module.id,
    templateUrl: 'deliveryTask.component.html'
})

export class DeliveryTaskComponent implements OnInit {
    OrderArray: any = [];
    editAble: any;
    resheduleForm = new FormGroup({
        pickupDate: new FormControl(null),
        pickupTime: new FormControl(null),
    })

    ngOnInit() {


        this.GetAllOrders()
    }
constructor(private deliveryService: DeliveryService, private route: Router, private toastr: ToastrService) {

}
GetAllOrders() {
    this.deliveryService.todayDeliveryTask({}).subscribe(res => {
        if (res.success) {
            this.OrderArray = res.message;
        }

    })
}
reached(orderId) {
    this.route.navigateByUrl('/delivery/deliveryReached/' + orderId)

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
reschedule(orderId, pickupDate, pickupTime) {
    this.editAble = orderId
    this.resheduleForm.controls.pickupDate.setValue(pickupDate)
    this.resheduleForm.controls.pickupTime.setValue(pickupTime)
}
update(orderId) {
    const data = this.resheduleForm.value
    data.orderId = orderId
this.deliveryService.rescheduleOrder(data).subscribe(res => {
this.editAble = ''
this.GetAllOrders()
})
}
cancel(orderId) {
    const data = {
        orderId: orderId
    }
   this.deliveryService.cancelOrder(data).subscribe(res => {
    this.showNotification('top', 'right', orderId)
    this.GetAllOrders()
})
}
}
