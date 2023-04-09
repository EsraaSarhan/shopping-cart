import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '', loadChildren: () => import(/* webpackChunkName: "ProductsList" */'./products/products.module')
      .then(mod => mod.ProductsModule)
  },
  {
    path: 'ProductsList', loadChildren: () => import(/* webpackChunkName: "ProductsList" */'./products/products.module')
      .then(mod => mod.ProductsModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

