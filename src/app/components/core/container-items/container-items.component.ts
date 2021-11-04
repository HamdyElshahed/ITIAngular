import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { onSnapshot , Firestore , collection} from '@angular/fire/firestore';
import { ProductService } from 'src/app/services/product.service';
import { Product } from '../../../models/Product';

@Component({
  selector: 'app-container-items',
  templateUrl: './container-items.component.html',
  styleUrls: ['./container-items.component.sass']
})
export class ContainerItemsComponent implements OnInit {
  constructor( private productservice : ProductService , private firestore : Firestore) {}
  arrproduct : any[] = [];
  npagesarr :number[] = [];
  arrayview : Product[]= [];
  numberitem: number = 9;
  currentpage : number = 0;
  inputsearchvalue! : string ;
  @ViewChild('search') getinput!: ElementRef;

  ngOnInit(): void {
     this.productservice.getAllProducts().then((res)=>{
       this.arrproduct = res;
       let npages = this.arrproduct.length / this.numberitem;
       for (let i = 0; i < npages; i++) {
         this.npagesarr.push(i+1)
       }
       this.slicearray();
    })

    this.productservice.itemsearch.subscribe(
      (next)=>{
        this.inputsearchvalue= next;
        this.search(this.inputsearchvalue);
      }
    )
    this.productservice.itemdelete.subscribe(
      (next)=>{
        this.arrproduct = this.productservice.deleteProduct(next);;
        this.slicearray();
        console.log(this.arrproduct)
      }
    )

    console.log(this.arrproduct)

  }

  slicearray(){
    this.arrayview = this.arrproduct.slice(this.currentpage * this.numberitem ,(this.currentpage * this.numberitem)+this.numberitem )
  }

  paging(i: number){
    if (i > -1 &&  i< this.npagesarr.length) {
      this.currentpage = i;
      this.slicearray();
    }
  }
  search(x:string) {
    console.log(x)
    console.log(this.arrproduct);
    let results: any[] = [];

    for (let i = 0; i < this.arrproduct.length; i++) {
      const element = this.arrproduct[i];
      if (element.basicdata[0].name === x) {
        results.push(element);
        // this.arrayproduct=results;
     }
    }
    console.log(results)
    this.arrproduct = results;
    this.slicearray();
    this.arrproduct = this.productservice.arrproduct;
  }
}
