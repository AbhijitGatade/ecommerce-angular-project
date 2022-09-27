import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChangepasswordComponent } from './changepassword/changepassword.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MainComponent } from './main/main.component';
import { OrderComponent } from './order/order.component';
import { OrdersComponent } from './orders/orders.component';

const routes: Routes = [
{
  path:"", component:MainComponent,
  children:[
    {path:'', component:DashboardComponent},
    {path:'orders', component:OrdersComponent},
    {path:'order/:id', component:OrderComponent},
    {path:'changepassword', component:ChangepasswordComponent},
  ]
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
