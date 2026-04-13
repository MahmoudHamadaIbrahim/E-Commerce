import { FlowbiteService } from './../../core/services/flowbite.service';
import { Component, computed, inject, PLATFORM_ID, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { initFlowbite } from 'flowbite';
import { AuthService } from '../../core/auth/services/auth.service';
import { isPlatformBrowser } from '@angular/common';
import { CartService } from '../../core/services/cart.service';
import { WishlistService } from '../../core/services/wishlist.service';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  private readonly authService = inject(AuthService);
  private readonly wishlistService = inject(WishlistService);
  private readonly platformId = inject(PLATFORM_ID);
  private readonly cartService = inject(CartService);
  private readonly flowbiteService = inject(FlowbiteService);
  readonly exactMatch = { exact: true };
  isLogged = computed(() => this.authService.isLogged());
  wishCount = computed(() => this.wishlistService.wishCount());
  count = computed(() => this.cartService.cartCount());

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      if (localStorage.getItem('freshToken')) {
        this.authService.isLogged.set(true);
      }
    }
  }

  logOut(): void {
    this.authService.signOut();
    this.cartService.cartCount.set(0);
    this.cartService.cartProductIds.set(new Set());

    this.wishlistService.wishCount.set(0);
    this.wishlistService.wishlistIds.set([]);
    this.isDrawerOpen.set(false);
  }
  isDrawerOpen = signal(false);
  toggleDrawer() {
    this.isDrawerOpen.update((v) => !v);
  }
  closeDrawer() {
    this.isDrawerOpen.set(false);
  }
}
