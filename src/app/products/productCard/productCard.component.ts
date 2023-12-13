import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  ViewChild,
  ElementRef,
  Output,
  EventEmitter,
} from '@angular/core';
export interface ProductData {
  _id: string;
  index: number;
  sku: string;
  isAvailable: boolean;
  price: number;
  imageUrl: string;
  title: string;
  category: string;
}
@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './productCard.component.html',
  styleUrl: './productCard.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductCardComponent {
  // Input for the product data
  @Input() productData: null | ProductData = null;
  // View child for the product image
  @ViewChild('productImageRef') productImageRef!: ElementRef;
  @Output() productClick = new EventEmitter<MouseEvent>();
  ngAfterViewInit() {
    const productImageEle: HTMLDivElement = this.productImageRef.nativeElement;
    if (this.productData) {
      productImageEle.style.backgroundImage = `url(${this.productData.imageUrl})`;
    }
  }
  cartBtnClick(event: MouseEvent) {
    this.productClick.emit(event);
  }
}
