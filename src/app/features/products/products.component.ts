import { Component } from '@angular/core';
import { ProductComponent } from '../home/components/product/product.component';

@Component({
  selector: 'app-products',
  imports: [ProductComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
})
export class ProductsComponent {}
