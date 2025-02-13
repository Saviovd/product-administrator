import { Component, OnInit } from '@angular/core';
import { ProductService, Product } from '../../services/product.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { take } from 'rxjs';

@Component({
  selector: 'app-product-list',
  standalone: true,
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
  imports: [CommonModule, FormsModule],
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  searchTerm: string = '';
  loading: boolean = true;

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.productService.getProducts().pipe(take(1)).subscribe({
      next: (data: Product[] = []) => {
        console.log('all data:', data);
        this.products = data || [];
        this.filteredProducts = [...this.products];
        this.loading = false;
      },
      error: (error) => {
        console.error('Erro ao carregar produtos', error);
        this.loading = false;
      }
    });
  }

  filterProducts(): void {
    const term = this.searchTerm.toLowerCase();
    this.filteredProducts = this.products.filter(product =>
      product.name.toLowerCase().includes(term) || product.description.toLowerCase().includes(term)
    );
  }
}
