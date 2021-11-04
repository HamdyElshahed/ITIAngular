import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Category, PaymentMethod, Product } from 'src/app/models/Product';
import { CategoryService } from 'src/app/services/category.service';
import { PaymentmethodService } from 'src/app/services/paymentmethod.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-addproduct',
  templateUrl: './addproduct.component.html',
  styleUrls: ['./addproduct.component.sass']
})
export class AddproductComponent implements OnInit {
  product = <Product | any>{};
  category: Category[]=[];
  paymentmethod: PaymentMethod[]= this.paymentmethodService.paymentmethod;
  isedit: boolean = false;
  increase : number =37;
  constructor(
    private categoryservice : CategoryService,
    private paymentmethodService : PaymentmethodService ,
    private productservice : ProductService ,
    private router : Router,
    private activaterRoute : ActivatedRoute,
    )
    {
      this.product= {
        id:this.increase,
        basicdata:[{id:0, name: '',description:'', lang :[{id:0, name: ''}] }] ,
        paymentmethod:[{id:0, name: 'effvsd'}],
        category:{id:0, name: ''} ,
        tags:[{id:0, name: ''}] ,
        price:0 ,
        imgurl: ['assets/img/dellg3i7.jpg']
      }
  }


  ngOnInit(): void {
    this.category = this.categoryservice.getAllCategory();
    // this.paymentmethod = this.paymentmethodService.getAllCategory();
    let productid = this.activaterRoute.snapshot.params.id;
    if (productid) {
      let product = this.productservice.getProduct(+productid);
         console.log(product);
         this.product =product;
         this.isedit = true;
    }

  }
  submit(form : NgForm ){
    let category = this.categoryservice.getCategotyById(+form.value.category);
    form.value.category = category;
    for (let index = 0; index < this.paymentmethod.length; index++) {
      if (form.value['check'+index]) {
        this.product.paymentmethod.push(this.paymentmethod[index])
      }

    }
    // this.product = form.value;/
    console.log(this.product);
    if (this.isedit) {
      this.productservice.updateProduct(this.product);
    }else{
      this.productservice.addProduct(this.product);
      this.increase++
    }
  }

  ontag(tag : HTMLInputElement){
    this.product.tags.push({name: tag.value});
    tag.value = "";
  }


}


