import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../../services/product.service';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css'],
})
export class ProductFormComponent {
  productForm: FormGroup;
  message: string = '';
  messageType: 'success' | 'error' | null = null;

  constructor(private fb: FormBuilder, private productService: ProductService) {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(0)]],
      image: [''],
    });
  }

  addProduct() {
    if (this.productForm.invalid) {
      this.productForm.markAllAsTouched();
      this.message = 'Preencha todos os campos obrigatórios!';
      this.messageType = 'error';
      return;
    }

    this.productService.addProduct(this.productForm.value).subscribe({
      next: () => {
        this.message = 'Produto cadastrado com sucesso!';
        this.messageType = 'success';
        this.productForm.reset();
      },
      error: (err) => {
        console.error('Erro ao cadastrar produto:', err);
        this.message = 'Erro ao cadastrar produto. Tente novamente!';
        this.messageType = 'error';
      },
    });
  }
}
