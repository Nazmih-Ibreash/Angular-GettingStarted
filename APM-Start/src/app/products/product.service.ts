import { Iproduct } from './product';
import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ProductService {
    private productUrl = '/api/products/products.json'
    constructor(private http: HttpClient) { }

    getProduct(): Observable<Iproduct[]> {
        return this.http.get<Iproduct[]>(this.productUrl);
    }
}