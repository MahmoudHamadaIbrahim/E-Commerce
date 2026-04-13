import { CurrencyPipe, isPlatformBrowser } from '@angular/common';
import { Product } from '../../../../core/models/product.interface';
import { ProductsService } from './../../../../core/services/products.service';
import { Component, computed, inject, input, OnInit, PLATFORM_ID, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CartService } from '../../../../core/services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { WishlistService } from '../../../../core/services/wishlist.service';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-product',
  imports: [CurrencyPipe, RouterLink, NgxPaginationModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css',
})
export class ProductComponent implements OnInit {
  private readonly productsService = inject(ProductsService);
  private readonly toastrService = inject(ToastrService);
  private readonly cartService = inject(CartService);
  private readonly wishlistService = inject(WishlistService);
  private readonly platformId = inject(PLATFORM_ID);
  wishlistIds = computed(() => this.wishlistService.wishlistIds());
  gridCols = input('sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5');
  productList = signal<Product[]>([]);

  pageSize = signal<number>(0);
  cp = signal<number>(0);
  total = signal<number>(0);

  ngOnInit(): void {
    this.getProductData();
  }

  updateProducts(pageNum: number = 1): void {
    this.productsService.getAllProducts(pageNum).subscribe({
      next: (res) => {
        this.productList.set(res.data);
        this.pageSize.set(res.metadata.limit);
        this.cp.set(res.metadata.currentPage);
        this.total.set(res.results);
      },
    });
  }

  getProductData(): void {
    this.updateProducts();
  }

  pageChange(pageNum: number): void {
    this.updateProducts(pageNum);
  }

  addToWishlist(id: string): void {
    const isInWishlist = this.wishlistIds().includes(id);

    if (isInWishlist) {
      this.wishlistService.removeProductFromWishlist(id).subscribe({
        next: (res: any) => {
          this.wishlistService.wishlistIds.set([...res.data]);
          this.wishlistService.wishCount.set(res.data.length);
        },
      });
    } else {
      this.wishlistService.addProuctToWishlist(id).subscribe({
        next: (res: any) => {
          this.wishlistService.wishlistIds.set([...res.data]);
          this.wishlistService.wishCount.set(res.data.length);
        },
      });
    }
  }

  addToCart(id: string): void {
    if (this.cartService.cartProductIds().has(id)) {
      this.toastrService.warning('This product is already in your cart!');
      return;
    }

    if (localStorage.getItem('freshToken')) {
      this.cartService.addProuctToCart(id).subscribe({
        next: (res) => {
          this.cartService.cartCount.set(res.numOfCartItems);
          this.cartService.cartProductIds.update((prevSet) => new Set(prevSet).add(id));
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
