import { Component, OnInit } from '@angular/core';
import { BaseComponent, SpinnerType } from '../../../base/base.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { BasketsComponent } from '../../../ui/components/baskets/baskets.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent extends BasketsComponent{
  constructor(private spinnerService: NgxSpinnerService) {
    super(spinnerService);
  }


}
