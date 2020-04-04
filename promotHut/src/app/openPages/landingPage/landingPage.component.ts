import { Component, OnInit, HostListener } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { OwnerService } from 'app/services/owner.service';
import { ToastrService } from 'ngx-toastr';
import {Router} from '@angular/router';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { DesignModalComponent } from 'app/shared/designModal/desigModal';
@Component({
    selector: 'app-landingpage-cmp',
    moduleId: module.id,
    templateUrl: 'landingPage.component.html'
})

export class LandingPageComponent implements OnInit {
    custArray: any = [];
    hidePromotVedio = false;
    bsModalRef: BsModalRef;
    constructor(private modalService: BsModalService,private router: Router) {}

    ngOnInit() {
    }
    openModal() {

        this.bsModalRef = this.modalService.show(DesignModalComponent, {class: 'modal-lg'});
        this.bsModalRef.content.closeBtnName = 'Close';
    }
}
