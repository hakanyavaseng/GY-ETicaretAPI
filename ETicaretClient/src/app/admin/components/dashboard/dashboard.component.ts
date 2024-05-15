import { Component, OnInit } from '@angular/core';
import { BaseComponent, SpinnerType } from '../../../base/base.component';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent extends BaseComponent implements OnInit{
  constructor(private spinnerService: NgxSpinnerService) {
    super(spinnerService);
  }

  ngOnInit() : void {
    this.showSpinner(SpinnerType.BallAtom);
  }


}
