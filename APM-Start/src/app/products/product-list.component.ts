import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Iproduct } from './product';
import { ProductService } from './product.service';

@Component({
    selector: 'pm-products',
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
    pageTitle = 'Product List!';
    imageWidth = 50;
    imageMargin = 2;
    showImage: boolean = false;
    errorMessage: string = '';
    subscription!: Subscription;

    private _listFilter: string = '';
    public get listFilter(): string {
        return this._listFilter;
    }
    public set listFilter(value: string) {
        this._listFilter = value;
        console.log('In setter: ', value);
        this.filteredProducts = this.performFilter(value);
    }

    filteredProducts: Iproduct[] = [];

    products: Iproduct[] = [];

    constructor(private productService: ProductService) { }


    performFilter(filterBy: string): Iproduct[] {
        filterBy = filterBy.toLocaleLowerCase();
        return this.products.filter((product: Iproduct) => product.productName.toLocaleLowerCase().includes(filterBy));
    }

    toggleImage(): void {
        this.showImage = !this.showImage;
    }

    ngOnInit(): void {
        this.productService.getProduct().subscribe({
            next: products => {
                this.products = products;
                this.filteredProducts = this.products;
            },
            error: err => this.errorMessage = err
        });
    }
    /*
        ngOnDestroy(): void {
            this.subscription.unsubscribe();
        }
        */

    onRatingClicked(message: string): void {
        this.pageTitle = 'Product List: ' + message;
    }
}