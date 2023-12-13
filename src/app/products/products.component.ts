import { CommonModule } from '@angular/common';
import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProductCardComponent } from './productCard/productCard.component';
import productData from './../../assets/mock/productData.json';
import { CartServiceService } from '../cart-service.service';
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
  standalone: true,
  imports: [CommonModule, FormsModule, ProductCardComponent],
})
export class ProductsComponent {
  // Get the category dropdown element reference
  @ViewChild('categoryDropdown') categoryDropdown!: ElementRef;
  // Set the default selected category
  selectedCategory = 'all';
  // Set the search value
  searchValue = '';
  // Set the product list
  productList = productData;
  // Set the modified product list
  modifiedProductList = productData;
  // Set the category list
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
  constructor(public cartService: CartServiceService) {}
  // Execute the updateCategory function after the view is initialized
  ngAfterViewInit() {
    this.updateCategory();
  }
  // Update the category
  updateCategory() {
    const categoryDDEle = this.categoryDropdown.nativeElement as HTMLDivElement;
    const categoryNameEle = categoryDDEle.querySelector(
      'span.categoryName'
    ) as HTMLSpanElement;
    // Set the category name
    categoryNameEle.textContent =
      this.categoryList.filter(
        (current) => current.value == this.selectedCategory
      )[0]?.viewValue ?? 'Category';
    // Reset the search value
    this.searchValue = '';
    // Update the products by category
    this.updateProductsByCategory();
  }
  // Update the products by category
  updateProductsByCategory() {
    if (this.selectedCategory != 'all') {
      this.modifiedProductList = this.productList.filter(
        (current) => current.category == this.selectedCategory
      );
    } else {
      this.modifiedProductList = this.productList;
    }
  }
  // Toggle the category filter
  toggleCategoryFilter() {
    const categoryDDEle = this.categoryDropdown.nativeElement as HTMLDivElement;
    categoryDDEle.classList.toggle('show');
  }
  // Execute when the category is clicked
  categoryClicked(eve: MouseEvent) {
    const selectedEle = eve.currentTarget as HTMLLIElement;
    // Set the selected category
    this.selectedCategory = selectedEle.dataset['itemValue'] ?? 'all';
    // Update the category
    this.updateCategory();
  }

  // Execute when the search filter is changed
  searchFilterChange() {
    console.log(this.searchValue);
    // Update the products by category
    this.updateProductsByCategory();
    // Filter the products by search value
    const searchedProducts = this.modifiedProductList.filter((current) =>
      current.title?.toLowerCase().includes(this.searchValue?.toLowerCase())
    );
    // Set the modified product list
    this.modifiedProductList = [...searchedProducts];
  }
  // Execute when the clear search button is clicked
  clearSearch() {
    // Reset the search value
    this.searchValue = '';
    // Execute the search filter change
    this.searchFilterChange();
  }
  addToCart() {
    this.cartService.setCartCount(1);
  }
}
