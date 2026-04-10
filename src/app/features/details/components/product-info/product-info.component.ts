import { Component, input } from '@angular/core';
import { Product } from '../../../../core/models/product.interface';

@Component({
  selector: 'app-product-info',
  imports: [],
  templateUrl: './product-info.component.html',
  styleUrl: './product-info.component.css',
})
export class ProductInfoComponent {
  productDetails = input.required<Product>();
}
