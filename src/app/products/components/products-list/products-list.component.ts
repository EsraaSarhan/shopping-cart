import { Component, OnInit } from '@angular/core';
import * as _ from 'underscore';
import { ProductsService } from '../../services/products.service';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ReceiptComponent } from '../receipt/receipt.component';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss']
})
export class ProductsListComponent implements OnInit {

  public selectedCategory: string = 'All Categories';
  public allCategories: any =  [];
  public allProducts: any = [];
  public pageNumber: number = 0;
  public pageSize: number = 30;
  public totalPrice: number = 0;
  constructor(private productService: ProductsService, private modalService: NgbModal,) {
    this.getCategoriesList();
    this.getAllProducats();
   }

  ngOnInit(): void {
    
  }

  getCategoriesList(){
    this.productService.getAllCategories().subscribe(
      res=>{
        console.log(res);
        this.allCategories = res;
      },
      err=>{
        console.log(err)
      }
    )
  }

  getAllProducats(){
    this.productService.getProducts(this.pageNumber, this.pageSize).subscribe(
      res=>{
        this.checkIfProductInCart(res.products);
      },
      err=>{
        console.log(err)
      }
    )
  }

  filterByCategory(cat: string){
    if(cat){
      this.productService.filterByCategory(cat).subscribe(
        res=>{
         this.checkIfProductInCart(res.products);
        },
        err=>{
          console.log(err)
        }
      )
    }
    else{
      this.getAllProducats();
    }
  }

  checkIfProductInCart(products: any){
    products.forEach((element: {
      discountPercentage: number;
      price: number; isAddedToCart: boolean; id: any; 
}) => {
      element.isAddedToCart = false;
      let selectedProducts = this.productService.getUserCart();
      if(selectedProducts && selectedProducts.length>0){
        let isExist = _.findWhere(selectedProducts, {id: element.id});
        if(isExist){
          element.isAddedToCart = true;
          this.onCartUpdated();
        }
      }
    });
    this.allProducts =products;
  }
  getUserCart(){
    console.log(this.productService.getUserCart());
  }

  onCartUpdated(){
    this.totalPrice = 0;
    let userProducts = this.productService.getUserCart();
    userProducts.forEach((element: {
      discountPercentage: number; price: number; 
}) => {
      this.totalPrice +=  Math.round(element.price - element.price * (element.discountPercentage/100));
    });
    console.log(this.productService.getUserCart(), "sa");
  }

  placeOrder(){
    const addModalRef = this.modalService.open(ReceiptComponent, { size: 'lg', backdrop: 'static' });
    addModalRef.componentInstance.totalPrice = this.totalPrice;

  }
}
