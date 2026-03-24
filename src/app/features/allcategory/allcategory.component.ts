import { Component, inject, OnInit, signal } from '@angular/core';
import { CategoriesService } from '../../core/services/categories.service';
import { Category } from '../../core/models/category.interface';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-allcategory',
  imports: [RouterLink],
  templateUrl: './allcategory.component.html',
  styleUrl: './allcategory.component.css',
})
export class AllcategoryComponent implements OnInit {
  private categoriesService = inject(CategoriesService);
  categoriesList = signal<Category[]>([]);

  ngOnInit(): void {
    this.getAllCategories();
  }

  getAllCategories() {
    this.categoriesService.getAllCategories().subscribe({
      next: (res) => {
        this.categoriesList.set(res.data);
      },
    });
  }
}
