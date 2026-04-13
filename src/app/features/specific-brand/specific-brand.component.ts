import { CurrencyPipe } from '@angular/common';
import { ChangeDetectorRef, Component, computed, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { BrandsService } from '../../core/services/brands.service';
import { WishlistService } from '../../core/services/wishlist.service';
import { CartService } from '../../core/services/cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-specific-brand',
  imports: [CurrencyPipe, RouterLink],
  templateUrl: './specific-brand.component.html',
  styleUrl: './specific-brand.component.css',
})
export class SpecificBrandComponent implements OnInit {
  brandId: string | null = '';
  brandData: any = null;
  products: any[] = [];
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly brandsService = inject(BrandsService);
  private readonly changeDetectorRef = inject(ChangeDetectorRef);
  private readonly wishlistService = inject(WishlistService);
  private readonly cartService = inject(CartService);
  private readonly toastrService = inject(ToastrService);
  wishlistIds = computed(() => this.wishlistService.wishlistIds());

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params) => {
      this.brandId = params.get('id');
      if (this.brandId) {
        this.getBrandProducts(this.brandId);
      }
    });
  }

  getBrandProducts(brandId: string) {
    this.brandsService.getSpecificBrand(brandId).subscribe({
      next: (res) => {
        this.brandData = res.data;
        this.changeDetectorRef.detectChanges();
      },
    });

    this.brandsService.getProductsByBrand(brandId).subscribe({
      next: (res) => {
        this.products = res.data;
        this.changeDetectorRef.detectChanges();
      },
      error: (err) => {
        console.error('Error fetching products:', err);
        this.products = [];
      },
    });
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
}
