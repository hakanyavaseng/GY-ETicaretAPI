import { Component } from '@angular/core';
import { BaseComponent, SpinnerType } from '../../../base/base.component';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrl: './customer.component.scss'
})
export class CustomerComponent extends BaseComponent {
  constructor(private spinnerService: NgxSpinnerService) {
    super(spinnerService);
  }

  ngOnInit() : void {
    this.showSpinner(SpinnerType.BallAtom);
  }


}
