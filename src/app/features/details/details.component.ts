import { Component, computed, inject, signal } from '@angular/core';
import { Product } from '../../core/models/product.interface';
import { CurrencyPipe } from '@angular/common';
import { ReviewsComponent } from './components/product-info/components/reviews/reviews.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../core/services/products.service';
import { ProductPhotosComponent } from './components/product-photos/product-photos.component';
import { DetailsInfoComponent } from './components/product-info/components/details-info/details-info.component';
import { ShippingComponent } from './components/product-info/components/shipping/shipping.component';
import { RelatedProductsComponent } from './components/related-products/related-products.component';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [
    ReviewsComponent,
    ProductDetailsComponent,
    ProductPhotosComponent,
    DetailsInfoComponent,
    ShippingComponent,
    RelatedProductsComponent,
  ],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css',
})
export class DetailsComponent {
  productDetails = signal<Product>({} as Product);
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly productsService = inject(ProductsService);

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

  activeTab = signal<string>('details');

  setTab(tabName: string) {
    this.activeTab.set(tabName);
  }
}
