import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client.service';
import { Create_Product } from '../../../contracts/create_product';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private httpClientService: HttpClientService) { }

  create(product: Create_Product, successCallBack?: any, errorCallBack?: any) {
    return this.httpClientService.post<Create_Product>(
      { controller: 'products' },
      product
    ).subscribe(result => {
      if (successCallBack) {
        successCallBack();
      }
    }, (errorResponse: HttpErrorResponse) => {
      let message = '';

      if (errorResponse.error && Array.isArray(errorResponse.error.Errors)) {
        const errors: Array<string> = errorResponse.error.Errors;
        errors.forEach(error => {
          message += error + '<br>';
        });
      } else {
        message = 'An unexpected error occurred';
      }

      if (errorCallBack) {
        errorCallBack(message);
      }
    });
  }
}
