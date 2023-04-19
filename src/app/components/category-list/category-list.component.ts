import { Component, OnInit} from '@angular/core';
import { Category } from 'src/app/models/category';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit{
  categories: Category[] = [];

  constructor(private _categoryService: CategoryService) {}

  ngOnInit(): void {
    this.listCategories();
  }

  listCategories() {
    this._categoryService.getCategories().subscribe(
      data => this.categories = data
    )
  }
}
