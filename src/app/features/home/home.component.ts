import { Component } from '@angular/core';
import { SliderComponent } from './components/slider/slider.component';
import { HomeCategoriesComponent } from './components/home-categories/home-categories.component';
import { ProductComponent } from './components/product/product.component';

@Component({
  selector: 'app-home',
  imports: [SliderComponent, HomeCategoriesComponent, ProductComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {}
