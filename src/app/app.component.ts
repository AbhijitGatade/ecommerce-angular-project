import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ecommerce-angular';
  cartcount = 0;

  GetChildData(count:any){
    this.cartcount = count;
  }

}
