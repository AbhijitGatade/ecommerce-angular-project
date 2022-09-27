import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  orders:any;

  constructor(private api:ApiService) { }

  ngOnInit(): void {
    this.api.post("admin/orders", {data:{userid:""}}).subscribe((result:any)=>{
      this.orders = result.data;
      this.orders = this.orders.filter((order:any)=>{
        if(order.status == "paid")
          return true;
        else
          return false;
      });
    })
  }

}
