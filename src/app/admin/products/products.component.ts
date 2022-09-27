import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  products:any;
  baseurl = this.api.baseurl;

  constructor(private api:ApiService) { }

  ngOnInit(): void {
    this.bind();
  }

  bind(){
    this.api.post("product/list", {data:{pcid:""}}).subscribe((result:any)=>{
      this.products = result.data;
    });
  }

  deleteproduct(id:string){
    if(confirm("Sure to delete?")){
      this.api.post("product/delete", {data:{id:id}}).subscribe((result:any)=>{
        this.bind();
      });
    }
  }

}
