import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Product, ProductService } from '../services/product.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
  imports: [CommonModule]
})
export class ProductDetailsComponent implements OnInit {
  productId: string | null = null;
  product: Product | null = null;
  loading: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.productId = params.get('id');
      if (this.productId) {
        this.loadProduct(this.productId);
      }
    });
  }

  navigateToProducts(): void {
    this.router.navigate(['/']);
  }

  private loadProduct(id: string): void {
    this.productService.getProductById(id).subscribe({
      next: (data: Product) => {
        this.product = data || {};
        this.loading = false;
      },
      error: (error) => {
        console.error('Erro ao carregar produto', error);
        this.loading = false;
      },
    });
  }
}
