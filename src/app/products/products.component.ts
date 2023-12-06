import { CommonModule } from '@angular/common';
import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProductCardComponent } from './productCard/productCard.component';
import productData from './../../assets/mock/productData.json';
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
  standalone: true,
  imports: [CommonModule, FormsModule, ProductCardComponent],
})
export class ProductsComponent {
  @ViewChild('categoryDropdown') categoryDropdown!: ElementRef;
  selectedCategory = 'all';
  searchValue = '';
  productList = productData;
  modifiedProductList = productData;
  categoryList = [
    {
      value: 'all',
      viewValue: 'All',
    },
    {
      value: 'clothing',
      viewValue: 'Clothing',
    },
    {
      value: 'electronics',
      viewValue: 'Electronics',
    },
    {
      value: 'books',
      viewValue: 'Books',
    },
    {
      value: 'phones',
      viewValue: 'Phones',
    },
  ];
  ngAfterViewInit() {
    this.updateCategory();
  }
  updateCategory() {
    const categoryDDEle = this.categoryDropdown.nativeElement as HTMLDivElement;
    const categoryNameEle = categoryDDEle.querySelector(
      'span.categoryName'
    ) as HTMLSpanElement;
    categoryNameEle.textContent =
      this.categoryList.filter(
        (current) => current.value == this.selectedCategory
      )[0]?.viewValue ?? 'Category';
    this.searchValue = '';
    this.updateProductsByCategory();
  }
  updateProductsByCategory() {
    if (this.selectedCategory != 'all') {
      this.modifiedProductList = this.productList.filter(
        (current) => current.category == this.selectedCategory
      );
    } else {
      this.modifiedProductList = this.productList;
    }
  }
  toggleCategoryFilter() {
    const categoryDDEle = this.categoryDropdown.nativeElement as HTMLDivElement;
    categoryDDEle.classList.toggle('show');
  }
  categoryClicked(eve: MouseEvent) {
    const selectedEle = eve.currentTarget as HTMLLIElement;
    this.selectedCategory = selectedEle.dataset['itemValue'] ?? 'all';
    this.updateCategory();
  }

  searchFilterChange() {
    console.log(this.searchValue);
    this.updateProductsByCategory();
    const searchedProducts = this.modifiedProductList.filter((current) =>
      current.title?.toLowerCase().includes(this.searchValue?.toLowerCase())
    );
    this.modifiedProductList = [...searchedProducts];
  }
  clearSearch() {
    this.searchValue = '';
    this.searchFilterChange();
  }
}
