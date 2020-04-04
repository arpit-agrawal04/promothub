import { OnInit, Component } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
@Component({
    selector: 'app-design-modal',
    templateUrl: './desigModal.html'
  })
export class DesignModalComponent implements OnInit {
    title: string;
    closeBtnName: string;
    list: any[] = [];

    constructor(public bsModalRef: BsModalRef) {}

    ngOnInit() {

    }
}