import { Component, Input, OnInit } from '@angular/core';
import { Product } from 'src/app/models/Product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass']
})
export class HeaderComponent implements OnInit {
  constructor(private productservice : ProductService) { }
  arrayproduct: Product[]=[];
  toggle : boolean = false;
  ele : number = 0;
  // nproduct : number = 1;

  ngOnInit(): void {
    this.productservice.itemclick.subscribe(
      (next)=>{
        let findarr = this.arrayproduct.find(item => item.id === next.id);
        console.log(findarr);
        // if (next.id === findarr?.id) {
        //   // this.nproduct++;
        //   next.price * this.nproduct;
        // }
        // else {
        //   this.nproduct = 1;
        //   this.arrayproduct.push(next);
        // }
        let element = 0;
        for (let i = 0; i < this.arrayproduct.length; i++) {
          element  +=  this.arrayproduct[i].price;
          this.ele = element;
        }
      },
      (error)=>{console.log(error)}
      )
      console.log(this.arrayproduct)

  }
}
