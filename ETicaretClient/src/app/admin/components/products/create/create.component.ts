import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../../services/common/models/product.service';
import { Create_Product } from '../../../../contracts/create_product';
import { BaseComponent, SpinnerType } from '../../../../base/base.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { AlertifyService, MessageType, Position } from '../../../../services/admin/alertify.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrl: './create.component.scss'
})
export class CreateComponent extends BaseComponent implements OnInit {
  constructor(spinner: NgxSpinnerService, private productService: ProductService, private alertService: AlertifyService) {
    super(spinner);
  }

  ngOnInit(): void {
  }

  create(name: HTMLInputElement, stock: HTMLInputElement, price: HTMLInputElement) {
    this.showSpinner(SpinnerType.BallAtom);
    const create_product: Create_Product = new Create_Product(name.value, parseInt(stock.value), parseFloat(price.value));

 
    this.productService.create(create_product, () => {
      this.hideSpinner(SpinnerType.BallAtom);
      this.alertService.message("Ürün başarıyla eklenmiştir.", {
        messageType: MessageType.Success,
        position: Position.TopRight,
        dismissOthers: true
      });
    }, errorMessage => {
      this.alertService.message(errorMessage, {
        messageType: MessageType.Error,
        position: Position.TopRight,
        dismissOthers: true
      });
      this.hideSpinner(SpinnerType.BallAtom);
    });

  }

}
