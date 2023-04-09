import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { ProductsListComponent } from './components/products-list/products-list.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { ReceiptComponent } from './components/receipt/receipt.component';
import { PriceReducedPipe } from './pipes/price-reduced.pipe';


@NgModule({
  declarations: [
    ProductsListComponent,
    ProductDetailsComponent,
    ReceiptComponent,
    PriceReducedPipe
  ],
  imports: [
    CommonModule,
    ProductsRoutingModule
  ]
})
export class ProductsModule { }
