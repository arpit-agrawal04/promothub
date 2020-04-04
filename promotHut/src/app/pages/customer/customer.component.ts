import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { OwnerService } from 'app/services/owner.service';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-customer-cmp',
    moduleId: module.id,
    templateUrl: 'customer.component.html'
})

export class CustomerComponent implements OnInit {
    custArray: any = [];

    ngOnInit() {


        this.GetAllCustomers()
    }
constructor(private ownerService: OwnerService) {

}
GetAllCustomers() {
    this.ownerService.GetAllCustomers({}).subscribe(res => {
        if (res.success) {
            this.custArray = res.message;
        }

    })
}
}
