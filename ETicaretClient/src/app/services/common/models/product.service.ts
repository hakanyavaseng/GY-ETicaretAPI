import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client.service';
import { Create_Product } from '../../../contracts/create_product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private httpClientService : HttpClientService) { }

  create(product : Create_Product, successCallBack?: any) {
    return this.httpClientService.post<Create_Product>({
      controller: 'products',
    }, product)
    .subscribe(result => {
      successCallBack();
    });
  }
}
