import { Component, HostListener, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';
declare var Razorpay: any;
@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  message:any = "Not yet stared";
  paymentId = "";
  error = "";

  orderid:string = "";
  products: any;
  formdata:any;
  baseurl = this.api.baseurl;
  subtotal = 0;
  delivery = 0;
  grandtotal = 0;

  options = {
    "key": "rzp_live_Ay9af2dQeUH8A6",
    "amount": "200",
    "name": "Abhijit Gatade",
    "description": "Abhijit E-Commerce Payment",
    "image": "https://www.abhijitgatade.com/assets/img/favicon.png",
    "order_id": "",
    "handler": function (response: any) {
      var event = new CustomEvent("payment.success",
        {
          detail: response,
          bubbles: true,
          cancelable: true
        }
      );
      window.dispatchEvent(event);
    },
    "prefill": {
      "name": "",
      "email": "",
      "contact": ""
    },
    "notes": {
      "address": ""
    },
    "theme": {
      "color": "#3399cc"
    }
  };

  constructor(private router: Router, private api: ApiService) { }

  ngOnInit(): void {

    if(localStorage.getItem("usertype") == null){
      this.router.navigate(['/login']);
    }
    if(localStorage.getItem("usertype") != "user"){
      this.router.navigate(['/login']);
    }
    this.bind();
  }

  bind() {

    this.formdata = new FormGroup(
      {
        userid:new FormControl(localStorage.getItem("id")),
        address:new FormControl("", Validators.required),
        city:new FormControl("", Validators.required),
        state:new FormControl("", Validators.required),
        pincode:new FormControl("", Validators.compose([Validators.required, Validators.minLength(6), Validators.maxLength(6)]))
      }
    )

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

  submit(data:any){

    let orderproducts = new Array();
    this.products.forEach((product:any) => {
      let orderproduct = {
        productid:product.id,
        name:product.name,
        color:product.color,
        size:product.size,
        quantity:product.quantity,
        price:product.price,
        total:product.quantity * product.price
      };
      orderproducts.push(orderproduct);
    });

    let object = {
      userid:data.userid,
      address:data.address,
      city:data.city,
      state:data.state,
      pincode:data.pincode,
      totalamount:this.subtotal,
      shipmentamount:this.delivery,
      billamount:this.grandtotal,
      products:orderproducts
    };
    //console.log(object);
    this.api.post("order/place", {data:object}).subscribe((result:any)=>{
      this.orderid = result.data._id;
      this.paynow();
    });
  }


  paynow() {
    this.paymentId = '';
    this.error = '';
    this.options.amount = "200";//(this.grandtotal * 100).toString();
    this.options.prefill.name = localStorage.getItem("name") || "";
    this.options.prefill.email = localStorage.getItem("email") || "";
    this.options.prefill.contact = "";
    var rzp1 = new Razorpay(this.options);
    rzp1.open();
    rzp1.on('payment.failed', function (response: any) {
      //this.message = "Payment Failed";
      // Todo - store this information in the server
      console.log(response.error.code);
      console.log(response.error.description);
      console.log(response.error.source);
      console.log(response.error.step);
      console.log(response.error.reason);
      console.log(response.error.metadata.order_id);
      console.log(response.error.metadata.payment_id);
      //this.error = response.error.reason;
    }
    );
  }

  @HostListener('window:payment.success', ['$event'])
  onPaymentSuccess(event: any): void {
    this.message = "Success Payment";
    //Call Mark Paid here
    this.api.post("order/markpaid", {data:this.orderid}).subscribe((result:any)=>{
      if(result.status === "success"){
        this.router.navigate(['/ordersuccess']);
      }
      else{
          alert(result.data);
      }
    });

  }

}
