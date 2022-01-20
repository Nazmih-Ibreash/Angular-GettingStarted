import { Iproduct } from './product';
import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap } from "rxjs/operators";
import { Observable, throwError } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ProductService {
    private productUrl = '/api/products/products.json'
    constructor(private http: HttpClient) { }

    getProduct(): Observable<Iproduct[]> {
        return this.http.get<Iproduct[]>(this.productUrl).pipe(
            tap(data => console.log('All ', JSON.stringify(data))),
            catchError(this.handleError)
        );
    }
    private handleError(err: HttpErrorResponse) {
        let errorMessage = '';
        if (err.error instanceof ErrorEvent) {
            errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
        } else {
            errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
        }
        console.error(errorMessage);
        return throwError(errorMessage);
    }
}