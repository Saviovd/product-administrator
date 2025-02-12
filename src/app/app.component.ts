import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductFormComponent } from './components/product-form/product-form.component';
import { CommonModule } from '@angular/common';
import { trigger, state, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-root',
  imports: [CommonModule, RouterOutlet, ProductListComponent, ProductFormComponent],
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  animations: [
    trigger('toggleForm', [
      state('open', style({ height: '*', opacity: 1, transform: 'translateY(0)' })),
      state('closed', style({ height: '0px', opacity: 0, transform: 'translateY(20px)' })),
      transition('closed => open', animate('500ms ease-out')),
      transition('open => closed', animate('500ms ease-in'))
    ])
  ]
})
export class AppComponent {
  title = 'product-administration';
  showForm = false;
}
