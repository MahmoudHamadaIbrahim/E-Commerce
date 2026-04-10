import { Component, input } from '@angular/core';
import { Product } from '../../../../../../core/models/product.interface';
import { ProductInfoComponent } from '../../product-info.component';

@Component({
  selector: 'app-details-info',
  imports: [ProductInfoComponent],
  templateUrl: './details-info.component.html',
  styleUrl: './details-info.component.css',
})
export class DetailsInfoComponent {
  productDetails = input.required<Product>();
}
