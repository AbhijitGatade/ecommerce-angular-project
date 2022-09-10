import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './general/about/about.component';
import { AdminloginComponent } from './general/adminlogin/adminlogin.component';
import { ContactComponent } from './general/contact/contact.component';
import { HomeComponent } from './general/home/home.component';
import { LoginComponent } from './general/login/login.component';
import { ProductsComponent } from './general/products/products.component';
import { RegisterComponent } from './general/register/register.component';

const routes: Routes = [
  {path:"", component:HomeComponent},
  {path:"home", component:HomeComponent},
  {path:"products", component:ProductsComponent},
  {path:"about", component:AboutComponent},
  {path:"contact", component:ContactComponent},
  {path:"adminlogin", component:AdminloginComponent},
  {path:"login", component:LoginComponent},
  {path:"register", component:RegisterComponent},

  {path:"admin", loadChildren:()=>import('./admin/admin.module').then(
    m=>m.AdminModule
  )}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
