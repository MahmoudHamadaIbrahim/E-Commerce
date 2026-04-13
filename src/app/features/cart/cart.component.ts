import { Component, inject, OnInit, PLATFORM_ID, signal } from '@angular/core';
import { CartService } from '../../core/services/cart.service';
import { Cart } from './models/cart.interface';
import { CurrencyPipe, isPlatformBrowser } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cart',
  imports: [CurrencyPipe, RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent implements OnInit {
  private readonly cartService = inject(CartService);
  private readonly platformId = inject(PLATFORM_ID);
  cartDetails = signal<Cart>({} as Cart);

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.getCartItems();
    }
  }

  getCartItems() {
    this.cartService.getCartItems().subscribe({
      next: (res) => {
        this.cartDetails.set(res.data);
      },
    });
  }

  removeItem(productId: string) {
    this.cartService.removeProductFromCart(productId).subscribe({
      next: (res) => {
        this.cartDetails.set(res.data);
      },
    });
  }

  update(productId: string, count: number) {
    this.cartService.updateCartItem(productId, count).subscribe({
      next: (res) => {
        this.cartDetails.set(res.data);
      },
    });
  }

  clearCart() {
    this.cartService.clearCart().subscribe({
      next: (res) => {
        this.cartDetails.set(res.data);
        this.cartService.cartCount.set(0);
        this.cartService.cartProductIds.set(new Set());
      },
    });
  }
}
