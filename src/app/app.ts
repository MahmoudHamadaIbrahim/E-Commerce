import { Component, inject, OnInit, PLATFORM_ID, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './layouts/navbar/navbar.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { NgxSpinnerComponent } from 'ngx-spinner';
import { CartService } from './core/services/cart.service';
import { WishlistService } from './core/services/wishlist.service';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent, FooterComponent, NgxSpinnerComponent],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App implements OnInit {
  protected readonly title = signal('E-Commerce');
  private readonly cartService = inject(CartService);
  private readonly wishlistService = inject(WishlistService);
  private readonly platformId = inject(PLATFORM_ID);

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      if (localStorage.getItem('freshToken')) {
        this.loadInitialData();
      }
    }
  }

  loadInitialData(): void {
    this.cartService.getCartItems().subscribe({
      next: (res) => {
        this.cartService.cartCount.set(res.numOfCartItems);
        const ids = res.data.products.map((p: any) => p.product._id);
        this.cartService.cartProductIds.set(new Set(ids));
      },
    });

    this.wishlistService.getWishlistItems().subscribe({
      next: (res: any) => {
        this.wishlistService.wishCount.set(res.data.length);
        const ids = res.data.map((item: any) => item._id);
        this.wishlistService.wishlistIds.set(ids);
      },
    });
  }
}
