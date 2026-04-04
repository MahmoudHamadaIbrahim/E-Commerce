import { Component, input } from '@angular/core';
import { Product } from '../../../../core/models/product.interface';

@Component({
  selector: 'app-product-photos',
  imports: [],
  templateUrl: './product-photos.component.html',
  styleUrl: './product-photos.component.css',
})
export class ProductPhotosComponent {
  productDetails = input.required<Product>();
}
