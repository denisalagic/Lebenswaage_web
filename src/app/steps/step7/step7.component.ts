import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material';
import {ActivatedRoute, Router} from '@angular/router';
import {ApiCallsService} from '../../api-calls.service';
import {StepsService} from "../steps.service";

@Component({
  selector: 'app-step7',
  templateUrl: './step7.component.html',
  styleUrls: ['./step7.component.css']
})
export class Step7Component implements OnInit {

  public showThankYouMessage: boolean = false;

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  matcher = new MyErrorStateMatcher();


  constructor(private apiCalls: ApiCallsService,
              private router: Router,
              private stepService: StepsService) { }

  ngOnInit() {

    //todo: add gdpr stuff
    this.stepService.gdprAgreement = true;
  }

  public sendMail() {
    this.apiCalls.sendEmail(this.emailFormControl.value).subscribe(resp => {
      this.showThankYouMessage = true;
      setTimeout(() => {
        this.showThankYouMessage = false;
        this.router.navigate(['../']);
      }, 7000)
    });
  }

}

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
