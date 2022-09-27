import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  formdata:any;
  message = "";

  constructor(private api:ApiService, private router:Router) { }

  ngOnInit(): void {
    this.formdata = new FormGroup({
      name:new FormControl("", Validators.required),
      email:new FormControl("", Validators.required),
      mobileno:new FormControl("", Validators.required),
      password:new FormControl("", Validators.required),
      cpassword:new FormControl("", Validators.required),
    })
  }

  submit(data:any){
    if(data.password != data.cpassword){
      alert("Password and confirm password not matching.");
    }

    this.api.post("user/register", {data:data}).subscribe((result:any)=>{
      if(result.status == "success"){
        localStorage.setItem("usertype", "user");
        localStorage.setItem("name", result.data.name);
        localStorage.setItem("email", result.data.email);
        localStorage.setItem("id", result.data._id);
        window.location.replace("/checkout");
      }
      else{
        this.message = result.data;
      }
    })
  }

}
