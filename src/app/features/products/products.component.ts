import { Component } from '@angular/core';
import { ProductComponent } from '../home/components/product/product.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-products',
  imports: [ProductComponent, RouterLink],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
})
export class ProductsComponent {}
