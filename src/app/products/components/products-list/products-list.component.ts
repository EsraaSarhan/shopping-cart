import { Component, OnInit } from '@angular/core';
import * as _ from 'underscore';
import { ProductsService } from '../../services/products.service';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

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
  constructor(private productService: ProductsService, private modalService: NgbModal, public modal: NgbActiveModal) {
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
        res.products.forEach((element: {
          discountPercentage: number;
          price: number; isAddedToCart: boolean; id: any; 
}) => {
          element.isAddedToCart = false;
          let selectedProducts = this.productService.getUserCart();
          if(selectedProducts && selectedProducts.length>0){
            let isExist = _.findWhere(selectedProducts, {id: element.id});
            if(isExist){
              element.isAddedToCart = true;
              this.totalPrice +=   Math.round(element.price - element.price * (element.discountPercentage/100));
            }
          }
        });
        this.allProducts = res.products;
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
          console.log(res);
          this.allProducts = res.products;
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

  getUserCart(){
    console.log(this.productService.getUserCart());
  }

  onCartUpdated($event: any){
    console.log($event, "u");
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

  }
}
