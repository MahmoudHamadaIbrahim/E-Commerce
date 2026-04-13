import { Component, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CartService } from '../../core/services/cart.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css',
})
export class CheckoutComponent implements OnInit {
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly cartService = inject(CartService);
  private readonly router = inject(Router);
  cartId = signal<string>('');
  private readonly fb = inject(FormBuilder);
  flag = signal<string>('cash');

  checkoutForm = this.fb.group({
    shippingAddress: this.fb.group({
      details: ['', [Validators.required, Validators.minLength(10)]],
      phone: ['', [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)]],
      city: ['', [Validators.required, Validators.minLength(4)]],
    }),
  });

  ngOnInit() {
    this.getCartId();
  }

  getCartId() {
    this.activatedRoute.paramMap.subscribe((params) => {
      this.cartId.set(params.get('id')!);
    });
  }

  submitForm() {
    if (this.checkoutForm.valid) {
      if (this.flag() === 'cash') {
        this.cartService.createCashOrder(this.cartId(), this.checkoutForm.value).subscribe({
          next: (res) => {
            if (res.status === 'success') {
              this.router.navigate(['/allorders']);
              this.cartService.cartCount.set(0);
              this.cartService.cartProductIds.set(new Set());
            }
          },
        });
      } else if (this.flag() === 'visa') {
        this.cartService.createVisaOrder(this.cartId(), this.checkoutForm.value).subscribe({
          next: (res) => {
            if (res.status === 'success') {
              window.open(res.session.url, '_self');
            }
          },
        });
      }
    } else {
      this.checkoutForm.markAllAsTouched();
    }
  }

  changeFlag(el: HTMLInputElement): void {
    this.flag.set(el.value);
  }
}
