import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-productvarieties',
  templateUrl: './productvarieties.component.html',
  styleUrls: ['./productvarieties.component.css']
})
export class ProductvarietiesComponent implements OnInit {

  id: any;
  formdata: any;
  product: any;

  constructor(private api: ApiService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get("id");
    this.bind();
  }

  bind() {
    this.api.post("product/get", { data: { id: this.id } }).subscribe((result: any) => {
      this.product = result.data;
      console.log(this.product);
    });

    this.formdata = new FormGroup(
      {
        id: new FormControl(this.id),
        color: new FormControl("", Validators.required),
        size: new FormControl("", Validators.required),
        mrp: new FormControl(0, Validators.required),
        price: new FormControl(0, Validators.required)
      }
    )
  }

  onClickSubmit(data: any) {
    let object = { id: this.id, variety: { color: data.color, size: data.size, mrp: data.mrp, price: data.price } };

    this.api.post("product/savevariety", { data: object }).subscribe((result: any) => {
      this.bind();
    })
  }

  deleteVariety(variety: any) {
    if (confirm("Sure to delete?")) {
      let object = { id: this.id, variety: variety };
      this.api.post("product/deletevariety", { data: object }).subscribe((result: any) => {
        this.bind();
      });
    }
  }
}
