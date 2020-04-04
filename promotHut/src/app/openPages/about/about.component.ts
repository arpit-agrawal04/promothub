import { Component, OnInit, HostListener } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { OwnerService } from 'app/services/owner.service';
import { ToastrService } from 'ngx-toastr';
import {Router} from '@angular/router'
@Component({
    selector: 'app-about-cmp',
    moduleId: module.id,
    templateUrl: 'about.component.html'
})

export class AboutComponent implements OnInit {
    custArray: any = [];
    hidePromotVedio = false;
    constructor(private router: Router) {
    }
    ngOnInit() {
    }

}
