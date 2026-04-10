import { Component, input } from '@angular/core';
import { Product } from '../../../../../../core/models/product.interface';

@Component({
  selector: 'app-shipping',
  imports: [],
  templateUrl: './shipping.component.html',
  styleUrl: './shipping.component.css',
})
export class ShippingComponent {
  productDetails = input.required<Product>();
}
