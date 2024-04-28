import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './admin/layout/layout.component';
import { DashboardComponent } from './admin/components/dashboard/dashboard.component';
import { HomeComponent } from './ui/components/home/home.component';

const routes: Routes = [
  {
    path: "admin", component: LayoutComponent, children: [
      { path: "", component: DashboardComponent }, // http://localhost:4200/admin
      { path: "customers", loadChildren: () => import("./admin/components/customer/customer.module").then(m => m.CustomerModule) }, // http://localhost:4200/admin/customers
      { path: "products", loadChildren: () => import("./admin/components/products/products.module").then(m => m.ProductsModule) }, // http://localhost:4200/admin/products
      { path: "orders", loadChildren: () => import("./admin/components/order/order.module").then(m => m.OrderModule) }
    ]
  },
  { path: "", component: HomeComponent}, // http://localhost:4200
  {path: "basket", loadChildren: () => import("./ui/components/baskets/baskets.module").then(m => m.BasketsModule) }, // http://localhost:4200/basket
  {path: "products", loadChildren: () => import("./ui/components/products/products.module").then(m => m.ProductsModule) }, // http://localhost:4200/products
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
