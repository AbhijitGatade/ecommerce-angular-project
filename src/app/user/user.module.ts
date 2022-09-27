import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { MainComponent } from './main/main.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { OrdersComponent } from './orders/orders.component';
import { ChangepasswordComponent } from './changepassword/changepassword.component';
import { OrderComponent } from './order/order.component';
import { NavbarComponent } from './navbar/navbar.component';


@NgModule({
  declarations: [
    MainComponent,
    DashboardComponent,
    OrdersComponent,
    ChangepasswordComponent,
    OrderComponent,
    NavbarComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule
  ]
})
export class UserModule { }
