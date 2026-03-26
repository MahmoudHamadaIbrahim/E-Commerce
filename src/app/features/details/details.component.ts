import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../core/services/products.service';
import { Product } from '../../core/models/product.interface';
import { CurrencyPipe } from '@angular/common';
import { ReviewsComponent } from './components/reviews/reviews.component';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CurrencyPipe, ReviewsComponent],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css',
})
export class DetailsComponent implements OnInit {
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly productsService = inject(ProductsService);
  quantity = signal<number>(1);
  productDetails = signal<Product>({} as Product);

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        this.getProductDetails(id);
      }
    });
  }

  getProductDetails(id: string): void {
    this.productsService.getSpecificProduct(id).subscribe({
      next: (res) => {
        this.productDetails.set(res.data);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

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

  activeTab = signal<string>('details');

  setTab(tabName: string) {
    this.activeTab.set(tabName);
  }
}
