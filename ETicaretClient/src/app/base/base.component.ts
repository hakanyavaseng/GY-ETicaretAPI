import { Component } from "@angular/core";
import { NgxSpinnerService } from "ngx-spinner";


export class BaseComponent {
  constructor(private spinner: NgxSpinnerService) { }

  showSpinner(spinnerType:SpinnerType): void {
    this.spinner.show(spinnerType as string);

    setTimeout(() => this.hideSpinner(spinnerType),1000);
  }

  hideSpinner(spinnerType:SpinnerType): void {
    this.spinner.hide(spinnerType as string);
  }
}

export enum SpinnerType {

  BallAtom = "ball-atom",
  BallScaleMultiple = "ball-scale-multiple",
}

