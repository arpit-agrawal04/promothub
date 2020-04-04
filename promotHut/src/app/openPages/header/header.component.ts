import { Component, OnInit, HostListener } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { OwnerService } from 'app/services/owner.service';
import { ToastrService } from 'ngx-toastr';
import {Router} from '@angular/router'
@Component({
    selector: 'app-header-cmp',
    moduleId: module.id,
    templateUrl: 'header.component.html'
})

export class HeaderComponent implements OnInit {
    custArray: any = [];
    hidePromotVedio = false;
    constructor(private router: Router) {
    }
    ngOnInit() {
        if (this.router.url.split('/')[1] === '') {
            this.hidePromotVedio = false;
        } else {
            this.hidePromotVedio = true;
        }

    }
    @HostListener('window:scroll', ['$event'])
    onWindowScroll(event) {
        console.log()
        if ((document.documentElement.scrollTop || document.body.scrollTop) > 250) {
            if (!this.hidePromotVedio) {
                document.documentElement.scrollTop = 0;
                document.body.scrollTop = 0;
            }
            this.hidePromotVedio = true
        }
    }
}
