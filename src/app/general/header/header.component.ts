import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  adminlogggedin = false;
  userloggedin = false;
  username = "";
  categories:any;
  @Input() cartcount = 0;

  constructor(private api:ApiService, private router:Router, private cartService:CartService) { }

  ngOnInit(): void {
    this.cartService.currentProductCount.subscribe(count => this.cartcount = count);

    if(localStorage.getItem("products") != null){
      let products = JSON.parse(localStorage.getItem("products") || "[]");
      this.cartcount = products.length;
      this.cartService.updateCartCount(products.length);
    }

    if(localStorage.getItem("usertype") === "admin")
      this.adminlogggedin = true;
    if(localStorage.getItem("usertype") === "user"){
      this.userloggedin = true;
      this.username = localStorage.getItem("name") || "";
    }


    this.api.post("productcategory/list", {}).subscribe((result:any)=>{
      this.categories = result.data;
    });

  }

  logout(){
    localStorage.clear();
    window.location.replace("/");
  }

}
