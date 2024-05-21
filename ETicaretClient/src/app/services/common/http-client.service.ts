import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpClientService {

  constructor(private httpClient: HttpClient, @Inject("baseUrl") private baseUrl: string) { }

  private url(requestParameter: Partial<RequestParameters>): string {
    // Example url: https://localhost:7294/api/Products/1
    return `${requestParameter.baseUrl ? requestParameter.baseUrl : this.baseUrl}/${requestParameter.controller}${requestParameter.action ? "/" + requestParameter.action : ""}`;
  }

  get<T>(requestParameter: Partial<RequestParameters>, id?: string) : Observable<T>{
    let url: string = "";

    if (requestParameter.fullEndpoint)
      url = requestParameter.fullEndpoint;
    else
      url = `${this.url(requestParameter)}${id ? `/${id}` : ""}${requestParameter.queryString ? `?${requestParameter.queryString}` : ""}`;

    return this.httpClient.get<T>(url, { headers: requestParameter.headers});
  }

  post<T>(requestParameter: Partial<RequestParameters>, body: Partial<T>) : Observable<T> {
    let url : string = "";

    if (requestParameter.fullEndpoint)
      url = requestParameter.fullEndpoint;
    else
      url = `${this.url(requestParameter)}${requestParameter.queryString ? `?${requestParameter.queryString}` : ""}`;
    
    return this.httpClient.post<T>(url, body, { headers: requestParameter.headers});
  }

  put<T>(requestParameter: Partial<RequestParameters>, body: Partial<T>) {
    let url: string = "";

    if (requestParameter.fullEndpoint)
      url = requestParameter.fullEndpoint;
    else
      url = `${this.url(requestParameter)}${requestParameter.queryString ? `?${requestParameter.queryString}` : ""}`;

    return this.httpClient.put<T>(url, body, { headers: requestParameter.headers});
  }

  delete(requestParameter: Partial<RequestParameters>, id: string) {

    let url: string = "";

    if (requestParameter.fullEndpoint)
      url = requestParameter.fullEndpoint;
    else
      url = `${this.url(requestParameter)}/${id}`;

    return this.httpClient.delete(url, { headers: requestParameter.headers});
  }

}

export class RequestParameters {
  controller?: string;
  action?: string;

  queryString?: string;
  headers?: HttpHeaders;
  baseUrl?: string;
  fullEndpoint?: string;
}
