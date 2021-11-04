import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/models/Product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-productdetails',
  templateUrl: './productdetails.component.html',
  styleUrls: ['./productdetails.component.sass']
})
export class ProductdetailsComponent implements OnInit {

  constructor( private productservice : ProductService , private activateroute : ActivatedRoute) { }
   product! : Product;
   relatedproduct : Product[]=[];
  ngOnInit(): void {
    this.activateroute.params.subscribe(
      (res)=>{
        this.relatedproduct = [];
        this.product = this.productservice.getProduct(+res.id);
        this.product.relatedproducts?.map(product =>{
          this.relatedproduct.push(this.productservice.getProduct(product))
        })
      }
    )
  }

}
