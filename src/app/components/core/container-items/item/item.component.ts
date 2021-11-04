import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { interval, Observable, Subject } from 'rxjs';
import { Product } from 'src/app/models/Product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.sass']
})
export class ItemComponent implements OnInit {
  @Input() product!: Product;
  constructor(private productservice : ProductService)  { }

  ngOnInit(): void {
    let observab = new  Observable((subscriber)=>{
      subscriber.next("");
    });
    let string = new Subject();
    observab.subscribe(
      (next)=>{next}
    )
    const test = interval(1000);
    // test.subscribe(
    //   (res)=>{console.log(res)}
    // )
  }
  getprice() {
    return this.product.discount ? this.product.price - this.product.discount : this.product.price
  }

  senddata(product: Product){
    this.productservice.itemclick.emit(product);
    console.log(product);
  }
 updatepd(){
   console.log(this.productservice.updateProduct(this.product));
 }
 deletepd(){
   this.productservice.itemdelete.emit(this.product.id);
 }
}
