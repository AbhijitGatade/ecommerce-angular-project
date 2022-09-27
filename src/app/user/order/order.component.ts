import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  orders: any;
  order: any;
  id: any;
  name = "";

  constructor(private api: ApiService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.name = localStorage.getItem("name") || "";
    this.id = this.route.snapshot.paramMap.get("id");
    this.api.post("user/orders", { data: { userid: localStorage.getItem("id") } }).subscribe((result: any) => {
      this.orders = result.data;
      this.orders = this.orders.filter((order: any) => {
        if (order._id == this.id)
          return true;
        else
          return false;
      });
      this.order = this.orders[0];
    })
  }

  printDiv() {
    var div = document.getElementById("divPrint");
    if (div != null) {
      var divContents = div.innerHTML;
      var a = window.open('', '', 'height=500, width=500');
      if (a != null) {
        a.document.write('<html>');
        a.document.write('<body > <h1>Div contents are <br>');
        a.document.write(divContents);
        a.document.write('</body></html>');
        a.document.close();
        a.print();
      }
    }
  }

}
