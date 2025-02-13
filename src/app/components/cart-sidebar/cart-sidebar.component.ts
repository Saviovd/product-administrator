import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cart-sidebar',
  templateUrl: './cart-sidebar.component.html',
  styleUrls: ['./cart-sidebar.component.css'],
  imports: [CommonModule],
  animations: [
    trigger('sidebarAnimation', [
      state('open', style({
        transform: 'translateX(0)'
      })),
      state('closed', style({
        transform: 'translateX(100%)'
      })),
      transition('open <=> closed', [
        animate('300ms ease-in-out')
      ])
    ])
  ]
})
export class CartSidebarComponent implements OnInit {
  isOpen: boolean = false;
  cartItems: any[] = [];

  constructor() {}

  ngOnInit(): void {
    this.loadCart();
  }

  toggleSidebar(): void {
    this.isOpen = !this.isOpen;
    if (this.isOpen) {
      this.loadCart();
    }
  }

  loadCart(): void {
    if (typeof window !== 'undefined') {
      const cartData = localStorage.getItem('cart');
      this.cartItems = cartData ? JSON.parse(cartData) : [];
    }
  }

  closeSidebar(): void {
    this.isOpen = false;
  }
}
