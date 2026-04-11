import { CurrencyPipe } from '@angular/common';
import { Product } from '../../../../core/models/product.interface';
import { ProductsService } from './../../../../core/services/products.service';
import { Component, inject, input, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CartService } from '../../../../core/services/cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product',
  imports: [CurrencyPipe, RouterLink],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css',
})
export class ProductComponent implements OnInit {
  private readonly productsService = inject(ProductsService);
  private readonly toastrService = inject(ToastrService);
  private readonly cartService = inject(CartService);
  gridCols = input('sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5');
  productList = signal<Product[]>([]);

  ngOnInit(): void {
    this.getProductData();
  }

  getProductData(): void {
    this.productsService.getAllProducts().subscribe({
      next: (res) => {
        this.productList.set(res.data);
      },
    });
  }

  addToCart(id: string): void {
    if (localStorage.getItem('freshToken')) {
      this.cartService.addProuctToCart(id).subscribe({
        next: (res) => {
          console.log(res);
        },
      });
    } else {
      this.toastrService.warning('Please login to add products to cart');
    }
  }

  getDiscountPercent(price: number, priceAfterDiscount: number): number {
    return Math.round(((price - priceAfterDiscount) / price) * 100);
  }
}
