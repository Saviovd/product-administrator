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
  quantity: number = 1;

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

  addToCart(): void {
    if (!this.product) return;
    if (typeof window == undefined) return;

    let cart = JSON.parse(localStorage.getItem('cart') || '[]');

    const existingProduct = cart.find(
      (item: { _id: string }) => item._id === this.product!._id
    );

    if (existingProduct) {
      existingProduct.quantity += this.quantity;
    } else {
      cart.push({ ...this.product, quantity: this.quantity });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    alert('Produto adicionado ao carrinho!');
    this.quantity = 1
  }

  updateQuantity(change: number): void {
    const newQuantity = this.quantity + change;
    if (newQuantity > 0) {
      this.quantity = newQuantity;
    }
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
