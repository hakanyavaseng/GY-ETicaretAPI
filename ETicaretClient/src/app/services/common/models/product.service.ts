import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client.service';
import { Create_Product } from '../../../contracts/create_product';
import { HttpErrorResponse } from '@angular/common/http';
import { List_Product } from '../../../contracts/list_product';
import { Observable, firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private httpClientService: HttpClientService) { }

  create(product: Create_Product, successCallBack?: () => void, errorCallBack?: (errorMessage: string) => void) {
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
  async read(page: number = 0, size: number = 10, successCallBack?: () => void, errorCallBack?: (errorMessage: string) => void): Promise<{ totalCount: number, products: List_Product[] }> {
    const promiseData: Promise<{ totalCount: number, products: List_Product[] }> = this.httpClientService.get<{ totalCount: number, products: List_Product[] }>({
      controller: "products",
      queryString: `page=${page}&size=${size}`
    }).toPromise();

    promiseData
      .then(d => successCallBack())
      .catch((errorResponse: HttpErrorResponse) => errorCallBack(errorResponse.message));

    return await promiseData;
  }

  // async delete(id: string) {
  //   const deleteObservable: Observable<any> = this.httpClientService.delete({
  //     controller: "products"
  //   }, id);

  //   await firstValueFrom(deleteObservable);
  // }
}
