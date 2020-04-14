import { OnInit, Component } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { OpenPageService } from 'app/services/openPages.Service';

@Component({
    selector: 'app-design-modal',
    templateUrl: './desigModal.html'
  })
export class DesignModalComponent implements OnInit {

    title: string;
    closeBtnName: string;
    DesignForm = new FormGroup({
      phone: new FormControl(null, [Validators.required]),
      compnay: new FormControl(null, [Validators.required]),
      compnayType: new FormControl(null, [Validators.required]),
      employes: new FormControl(null, [Validators.required]),
      marketing: new FormControl(null, [Validators.required]),
      offer: new FormControl(null),
      email: new FormControl(null, [ Validators.email, Validators.required] ),
    })
    markObjective: string[];
    noEmp: string[];
    bestDefine: string[];
    tab: number;
  uploadForm: any;
  block1: string;
  colorArray: string[] = [];
  frameArray: string[] = ['frame.png']
  imageSrc: string | ArrayBuffer;
  FrameStyle: string;
  setThisframe: any;
    get control() {
      return   this.DesignForm.controls;
    }
    constructor(public bsModalRef: BsModalRef, private formBuilder: FormBuilder, private openPageService: OpenPageService) {

    }

    ngOnInit() {
      this.uploadForm = this.formBuilder.group({
        profile: ['']
      });
      this.bestDefine = ['Education', 'Shoping Stores', 'Life Style' , 'Fooding' , 'Travel', 'Entertainment']
      this.noEmp = ['0-10', '10-50', '50-200', '200-1000', '1000-more']
      this.markObjective = ['Brand Awareness', 'Traffic', 'App install', 'Video Views', 'Lead Genration', 'Store Visits', 'Sale Conversion']
      this.tab = 1
    // tslint:disable-next-line: max-line-length
    if (localStorage.getItem('sessionId') !== null && localStorage.getItem('sessionId') !== undefined && localStorage.getItem('sessionId') !== 'undefined') {
      const data = {
        sessionId: localStorage.getItem('sessionId')
      }
      console.log(data)
      this.openPageService.getSessionData(data).subscribe(res => {
        if (res.success) {
          this.DesignForm.setValue(res.message)
        }
      })
    }
    }
    async imageInserted(event) {
      this.colorArray = [    ]
      const sourceImage = event.target.files[0];
      const reader = new FileReader();
      reader.onload = e => this.imageSrc = reader.result;

      reader.readAsDataURL(sourceImage);
      this.uploadForm.get('profile').setValue(sourceImage);
      const formData = new FormData();
      formData.append('file',  this.uploadForm.get('profile').value, sourceImage.name);
      formData.append('sessionId', localStorage.getItem('sessionId'));
      console.log(formData)
      this.openPageService.uploadImage(formData).subscribe(res => {
        this.FrameStyle = 'width:20%;background-image:' + this.imageSrc + ';'
        console.log(res)
        this.colorArray.push('background-color: rgb(' + res.mainColor[0] + ',' + res.mainColor[1] + ',' + res.mainColor[2] + ');height:20px;margin:1px')
        res.colors.forEach(element => {
          this.colorArray.push( 'background-color: rgb(' + element[0] + ',' + element[1] + ',' + element[2] + ');height:20px;margin:1px' )
        });
      })


    //   const colorThief = new ColorThief();
    //   console.log(
    //     colorThief.getColor(sourceImage)
    // );

    // Display palette of colors
    // e.g [[55,37,29],[213,193,136],[110,204,223]]
    // console.log(
    //     colorThief.getPalette(sourceImage)
    // );

    }
    nextStep() {
       // tslint:disable-next-line: max-line-length
    if (localStorage.getItem('sessionId') !== null && localStorage.getItem('sessionId') !== undefined && localStorage.getItem('sessionId') !== 'undefined') {
      this.DesignForm.value.sessionId = localStorage.getItem('sessionId');
    }
      this.DesignForm.markAllAsTouched()
      console.log(this.DesignForm.value)
      if (this.DesignForm.valid) {
        this.openPageService.nextStep(this.DesignForm.value).subscribe(res => {
          if (res.success) {
            this.tab++
            console.log(res.sessionId);

            localStorage.setItem('sessionId', res.sessionId)
          }
            })
      }


    }

    setSelectedFrame(setThisframe) {
        this.setThisframe = setThisframe;
    }

}
