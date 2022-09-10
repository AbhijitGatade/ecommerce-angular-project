import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  baseurl = "https://igapecommerceproject.herokuapp.com/";

  constructor(private http:HttpClient) { }

  post(path:string, data:any){
    const headers = {'Content-type':'application/json'};
    const body = JSON.stringify(data);
    return this.http.post(this.baseurl + path, body, {'headers':headers});
  }
}
