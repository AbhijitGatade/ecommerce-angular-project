import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/api.service';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  id:any;
  product:any;
  baseurl = this.api.baseurl;
  quantity = 1;
  mrp = 0;
  price = 0;
  size = "";
  color = "";
  message = "";

  @Output() myOutput:EventEmitter<number>= new EventEmitter();

  constructor(private api:ApiService, private route:ActivatedRoute, private cartService:CartService) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get("id");
    this.api.post("product/get", {data:{id:this.id}}).subscribe((result:any)=>{
      this.product = result.data;
      this.mrp = this.product.mrp;
      this.price = this.product.price;
    });
  }

  addQuantity(){
    this.quantity += 1;
  }

  reduceQuantity(){
    if(this.quantity > 1)
      this.quantity -= 1;
  }

  checkForMRPPrice(){
    this.message = "";
    if(this.size != "" && this.color != ""){
      let found = false;
      for(let i = 0; i < this.product.varieties.length; i++){
        if(this.product.varieties[i].size == this.size && this.product.varieties[i].color == this.color){
          this.mrp = this.product.varieties[i].mrp;
          this.price = this.product.varieties[i].price;
          found = true;
          break;
        }
      }
      if(!found){
        this.message = "Product with this size and color not available.";
      }
    }
    else{
      this.mrp = this.product.mrp;
      this.price = this.product.price;
    }
  }

  addToCart(){
    let toaddToCart = false;
    if(this.size != "" && this.color != ""){
      let found = false;
      for(let i = 0; i < this.product.varieties.length; i++){
        if(this.product.varieties[i].size == this.size && this.product.varieties[i].color == this.color){
          this.mrp = this.product.varieties[i].mrp;
          this.price = this.product.varieties[i].price;
          found = true;
          break;
        }
      }
      if(!found){
        this.message = "Product with this size and color not available.";
      }
      else{
        toaddToCart = true;
      }
    }
    else{
      this.mrp = this.product.mrp;
      this.price = this.product.price;
      toaddToCart = true;
    }
    if(toaddToCart){
      let product = {
                    id:this.id,
                    name:this.product.name,
                    imagepath:this.product.imagepath,
                    color:this.color,
                    size:this.size,
                    quantity:this.quantity,
                    mrp:this.mrp,
                    price:this.price};
      let products = new Array();
      if(localStorage.getItem("products") != null)
        products = JSON.parse(localStorage.getItem("products") || "[]");

      let added = false;
      for(let i = 0; i < products.length; i++){
        if(products[i].id == product.id && products[i].color ==  product.color && products[i].size == product.size){
          alert("Product already added to cart");
          added = true;
        }
      }
      if(!added){
        products.push(product);
        localStorage.setItem("products", JSON.stringify(products));
        alert("Product added to cart");
      }
      // let span = document.getElementById("spnCount");
      // if(span != null){
      //   span.innerText = products.length.toString();
      // }
      this.myOutput.emit(products.length);
      this.cartService.updateCartCount(products.length);

    }
  }
}
