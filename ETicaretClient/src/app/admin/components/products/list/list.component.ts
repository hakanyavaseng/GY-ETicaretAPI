import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { List_Product } from '../../../../contracts/list_product';
import { ProductService } from '../../../../services/common/models/product.service';
import { AlertifyService, MessageType, Position } from '../../../../services/admin/alertify.service';
import { BaseComponent, SpinnerType } from '../../../../base/base.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent extends BaseComponent implements OnInit {
  constructor(private productService: ProductService, private alertify: AlertifyService, spinner: NgxSpinnerService) {
    super(spinner);
  }



  displayedColumns: string[] = ['name', 'stock', 'price', 'createdDate', 'updatedDate'];
  dataSource: MatTableDataSource<List_Product> = null;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  async listProducts() {

    this.showSpinner(SpinnerType.BallAtom);

    const allProducts: {totalCount:number, products: List_Product[]} = await this.productService.read(this.paginator ? this.paginator.pageIndex : 0, this.paginator ? this.paginator.pageSize : 10,() => {
      this.hideSpinner(SpinnerType.BallAtom);
    }, (message) => {
      this.alertify.message(message, {
        position: Position.TopRight,
        dismissOthers: true,
        messageType: MessageType.Error,
        delay: 5000
      });
      this.hideSpinner(SpinnerType.BallAtom);
    });
    this.dataSource = new MatTableDataSource<List_Product>(allProducts.products);
    this.paginator.length = allProducts.totalCount;

    console.log(this.paginator.length);

  }

  async pageChanged() {
    await this.listProducts();
  }

  async ngOnInit() {
    await this.listProducts();
  }
}
