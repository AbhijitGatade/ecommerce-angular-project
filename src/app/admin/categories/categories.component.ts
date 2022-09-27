import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

  formdata:any;
  categories:any;
  baseurl = this.api.baseurl;
  imagestring = "";
  constructor(private api:ApiService) { }

  ngOnInit(): void {
    this.bind();
  }

  bind(){
    this.api.post("productcategory/list", {}).subscribe((result:any)=>{
      this.categories =result.data;
      console.log(this.categories);
    });
    this.formdata = new FormGroup(
      {
        id:new FormControl(""),
        name:new FormControl("", Validators.required),
        srno:new FormControl(1, Validators.required),
        image:new FormControl("")
      }
    )
  }

  onClickSubmit(data:any){
    data.image = this.imagestring;
    console.log(data);
    this.api.post("productcategory/save", {data:data}).subscribe((result:any)=>{
      this.bind();
    });
  }

  imageChanged(event:any){
    let file = event.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = ()=>{
      if(reader.result != null){
        this.imagestring = reader.result.toString();
      }
    }
  }

  deletecategory(id:string){
    if(confirm("Sure to delete?")){
      this.api.post("productcategory/delete", {data:{id:id}}).subscribe((result:any)=>{
        this.bind();
      });
    }
  }

  editcategory(id:string){
    this.api.post("productcategory/get", {data:{id:id}}).subscribe((result:any)=>{
      let category = result.data;
      this.formdata = new FormGroup(
        {
          id:new FormControl(category._id),
          name:new FormControl(category.name, Validators.required),
          srno:new FormControl(category.srno, Validators.required),
          image:new FormControl("")
        }
      )
    });
  }

}
