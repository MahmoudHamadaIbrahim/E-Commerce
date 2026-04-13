import { CartService } from './../../core/services/cart.service';
import { Component, computed, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../core/auth/services/auth.service';
import { WishlistService } from '../../core/services/wishlist.service';

@Component({
  selector: 'app-login',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  private readonly fb = inject(FormBuilder);
  private readonly router = inject(Router);
  private readonly authService = inject(AuthService);
  private readonly cartService = inject(CartService);
  private readonly wishlistService = inject(WishlistService);
  wishCount = computed(() => this.wishlistService.wishCount());
  count = computed(() => this.cartService.cartCount());

  showPassword(element: HTMLInputElement): void {
    if (element.type === 'password') {
      element.type = 'text';
    } else {
      element.type = 'password';
    }
  }

  logInForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: [
      '',
      [
        Validators.required,
        Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/),
      ],
    ],
  });

  submitForm(): void {
    if (this.logInForm.valid) {
      this.authService.signIn(this.logInForm.value).subscribe({
        next: (res) => {
          if (res.message === 'success') {
            localStorage.setItem('freshToken', res.token);
            localStorage.setItem('user', JSON.stringify(res.user));
            this.authService.isLogged.set(true);

            this.wishlistService.getLoggedUserWishlist().subscribe({
              next: (res: any) => {
                this.wishlistService.wishCount.set(res.data.length);

                const ids = res.data.map((item: any) => item._id);
                this.wishlistService.wishlistIds.set(ids);
              },
            });

            this.cartService.getLoggedUserCart().subscribe({
              next: (res: any) => {
                this.cartService.cartCount.set(res.numOfCartItems);

                const ids = res.data.products.map((p: any) => p.product._id);
                this.cartService.cartProductIds.set(new Set(ids));
              },
            });

            this.router.navigate(['/']);
          }
        },
      });
    } else {
      this.logInForm.markAllAsTouched();
    }
  }
}
