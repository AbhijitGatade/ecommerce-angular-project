import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  products: any;
  baseurl = this.api.baseurl;
  subtotal = 0;
  delivery = 0;
  grandtotal = 0;

  constructor(private router: Router, private api: ApiService) { }

  ngOnInit(): void {
    this.bind();
  }

  bind() {
    this.products = JSON.parse(localStorage.getItem("products") || "[]");
    this.subtotal = 0;
    this.grandtotal = 0;
    this.delivery = 0;
    for(let i = 0; i < this.products.length; i++){
      this.subtotal += this.products[i].price * this.products[i].quantity;
    }
    this.grandtotal = this.subtotal + this.delivery;
    if (this.products.length == 0) {
      this.router.navigate(['/']);
    }
  }

  quantityChanged(product: any, event: any) {
    let ctrl = <HTMLInputElement>(event.target);
    for (let i = 0; i < this.products.length; i++) {
      if (this.products[i].id === product.id && this.products[i].size === product.size && this.products[i].color === product.color) {
        this.products[i].quantity = parseInt(ctrl.value);
      }
    }
    localStorage.setItem("products", JSON.stringify(this.products));
    this.bind();
  }

  deleteProduct(product: any) {
    if (confirm("Sure to remove?")) {
      let cartproducts = new Array();
      for (let i = 0; i < this.products.length; i++) {
        if (this.products[i].id === product.id && this.products[i].size === product.size && this.products[i].color === product.color) {

        }
        else{
          cartproducts.push(this.products[i]);
        }
      }
      this.products = cartproducts;
      localStorage.setItem("products", JSON.stringify(this.products));
      this.bind();
    }
  }

}
