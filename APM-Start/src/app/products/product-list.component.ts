import { Component, OnInit } from '@angular/core';
import { Iproduct } from './product';
import { ProductService } from './product.service';

@Component({
    selector: 'pm-products',
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

    ngOnInit(): void {
        //throw new Error('Method not implemented.');
        // console.log('OnInit');
        this.products = this.productService.getProduct();
        this.filteredProducts = this.products;

    }

    pageTitle = 'Product List!';
    imageWidth = 50;
    imageMargin = 2;
    showImage: boolean = false;

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

    constructor(private productService: ProductService) {

    }
    performFilter(filterBy: string): Iproduct[] {
        filterBy = filterBy.toLocaleLowerCase();
        return this.products.filter((product: Iproduct) => product.productName.toLocaleLowerCase().includes(filterBy));
    }

    toggleImage(): void {
        this.showImage = !this.showImage;
    }



    onRatingClicked(message: string): void {
        this.pageTitle = 'Product List: ' + message;
    }
}