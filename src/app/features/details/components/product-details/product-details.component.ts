import { Component, computed, input, signal } from '@angular/core';
import { Product } from '../../../../core/models/product.interface';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-product-details',
  imports: [CurrencyPipe],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css',
})
export class ProductDetailsComponent {
  productDetails = input.required<Product>();
  quantity = signal<number>(1);

  totalPrice = computed(() => {
    return this.productDetails().price * this.quantity();
  });

  increaseQty() {
    if (this.quantity() < this.productDetails().quantity) {
      this.quantity.update((q) => q + 1);
    }
  }

  decreaseQty() {
    if (this.quantity() > 1) {
      this.quantity.update((q) => q - 1);
    }
  }
}
