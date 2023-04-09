import { Injectable } from '@angular/core';

import {  Subject } from 'rxjs';
import { HttpClient, HttpXsrfTokenExtractor } from '@angular/common/http'
import { ICategory, IProduct } from '../dataModels/product';
import { stringify } from 'querystring';
import * as _ from 'underscore';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  public userCart: any = [];

  constructor(private http: HttpClient) { }

  //https://dummyjson.com/products/categories

  getAllCategories(){
      return this.http.get<ICategory[]>('https://dummyjson.com/products/categories');
    
  }

  getProducts(count: number, pageNumber: number){
    return this.http.get<any>('https://dummyjson.com/products?limit=' + count + '&skip=' + pageNumber);
  
}

  filterByCategory(cat: string){
    
    return this.http.get<any>('https://dummyjson.com/products/category/' + cat);

  }

  updateCart(item: any, action: string){
    //this.userCart.push[item];
    let userCart: any = localStorage.getItem('userCart');
    this.userCart = JSON.parse(userCart);

    if(action === 'add'){
      if(this.userCart && this.userCart.length > 0){

        this.userCart.push(item)
      }
      else{
        this.userCart = [];
        this.userCart.push(item)
      }
    }
    else if(action === 'remove'){
      if( this.userCart && this.userCart.length > 0){
        let isExist: any = _.findWhere(this.userCart, {id : item.id});
        if(isExist){
          this.userCart = _.without(this.userCart, isExist)
        }
      }
    }
   
    localStorage.setItem('userCart', JSON.stringify(this.userCart))
}

  getUserCart(){
    let userCart: any = localStorage.getItem('userCart');
    this.userCart = JSON.parse(userCart);

    return this.userCart;
  }
 
}



