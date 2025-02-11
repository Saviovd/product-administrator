import { Component, OnInit } from '@angular/core';
import { ProductService, Product } from '../../services/product.service';
import { CommonModule } from '@angular/common';
import { take } from 'rxjs';

@Component({
  selector: 'app-product-list',
  standalone: true,
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
  imports: [CommonModule],
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  loading: boolean = true;

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.productService.getProducts().pipe(take(1)).subscribe({
      next: (data: Product[]) => {
        console.log('all data:', data);
        this.products = data || [];
        this.loading = false;
      },
      error: (error) => {
        console.error('Erro ao carregar produtos', error);
        this.loading = false;
      }
    });
  }
}
