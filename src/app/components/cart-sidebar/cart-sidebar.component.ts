import { Component, OnInit } from '@angular/core';
import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cart-sidebar',
  templateUrl: './cart-sidebar.component.html',
  styleUrls: ['./cart-sidebar.component.css'],
  imports: [CommonModule],
  animations: [
    trigger('sidebarAnimation', [
      state(
        'open',
        style({
          transform: 'translateX(0)',
        })
      ),
      state(
        'closed',
        style({
          transform: 'translateX(100%)',
        })
      ),
      transition('open <=> closed', [animate('300ms ease-in-out')]),
    ]),
  ],
})
export class CartSidebarComponent implements OnInit {
  isOpen: boolean = false;
  cartItems: any[] = [];
  totalPrice: number = 0;

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
      this.calculateTotalPrice();
    }
  }

  removeFromCart(index: number): void {
    let cart = JSON.parse(localStorage.getItem('cart') || '[]');

    cart.splice(index, 1);

    localStorage.setItem('cart', JSON.stringify(cart));
    this.cartItems = cart;
    this.calculateTotalPrice();
  }

  updateCartQuantity(index: number, change: number): void {
    let cart = JSON.parse(localStorage.getItem('cart') || '[]');

    if (cart[index].quantity + change > 0) {
      cart[index].quantity += change;
      localStorage.setItem('cart', JSON.stringify(cart));
      this.cartItems = cart;
      this.calculateTotalPrice();
    }
  }

  calculateTotalPrice(): void {
    this.totalPrice = this.cartItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
  }

  closeSidebar(): void {
    this.isOpen = false;
  }
}
