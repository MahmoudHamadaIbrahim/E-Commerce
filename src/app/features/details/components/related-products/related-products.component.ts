import {
  Component,
  computed,
  effect,
  ElementRef,
  inject,
  input,
  OnInit,
  signal,
  ViewChild,
} from '@angular/core';
import { Product } from '../../../../core/models/product.interface';
import { ProductsService } from '../../../../core/services/products.service';
import { RouterLink } from '@angular/router';
import { DecimalPipe } from '@angular/common';
import { WishlistService } from '../../../../core/services/wishlist.service';

@Component({
  selector: 'app-related-products',
  imports: [RouterLink, DecimalPipe],
  templateUrl: './related-products.component.html',
  styleUrl: './related-products.component.css',
})
export class RelatedProductsComponent {
  private readonly productsService = inject(ProductsService);
  private readonly wishlistService = inject(WishlistService);
  wishlistIds = computed(() => this.wishlistService.wishlistIds());
  relatedProducts = signal<Product[]>([]);
  productDetails = input.required<Product>();
  @ViewChild('slider') slider!: ElementRef;

  constructor() {
    effect(() => {
      if (this.productDetails()?.category?._id) {
        this.getRelatedProducts();
      }
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

  getRelatedProducts(): void {
    this.productsService.getAllProducts().subscribe({
      next: (res) => {
        const filtered = res.data.filter(
          (p: Product) =>
            p.category._id === this.productDetails().category._id &&
            p._id !== this.productDetails()._id,
        );
        this.relatedProducts.set(filtered);
      },
    });
  }

  moveSlider(direction: 'next' | 'prev') {
    const el = this.slider.nativeElement;
    const cardWidth = el.offsetWidth / 3;
    el.scrollBy({
      left: direction === 'next' ? cardWidth : -cardWidth,
      behavior: 'smooth',
    });
  }
}
