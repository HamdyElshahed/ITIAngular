import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Filter } from 'src/app/models/asidefilter';
import { Product } from 'src/app/models/Product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-aside',
  templateUrl: './aside.component.html',
  styleUrls: ['./aside.component.sass']
})
export class AsideComponent implements OnInit {
  // @ViewChild('search') getinput! : ElementRef ;
  @ViewChild('search') getinput!: ElementRef;
  arrfilter : Filter[];
  arrayproduct : Product[]=[];
  constructor(private productservice : ProductService) {
    this.arrfilter = [
      {name: 'Arts & Crafts'},
      {name: 'Automotive'},
      {name: 'Baby'},
      {name: 'Books'},
      {name: 'Eletronics'},
      {name: 'Womens Fashion'},
      {name: 'Men s Fashion<'},
      {name: 'Health & Household'},
      {name: 'Home & Kitchen'},
      {name: 'Military Accessories'},
      {name: ' Movies & Television'},
      {name: 'Sports & Outdoors'},
      {name: 'Tools & Home Improvement'},
      {name: 'Toys & Games'}
    ]
   }
   x !: string;
  ngOnInit(): void {
    this.arrayproduct= this.productservice.arrproduct;
  }
  getdata(){
    this.x = this.getinput.nativeElement.value;
    console.log(this.x )
    this.productservice.itemsearch.emit(this.x);
    // let getval = this.search(this.x);
    // console.log(getval)
  }
}

