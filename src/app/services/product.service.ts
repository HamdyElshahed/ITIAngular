import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable, Query } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../models/Product';
// import { initializeApp } from "firebase/app";
// import { getFirestore } from "firebase/firestore";
// import { collection, addDoc } from "firebase/firestore";
import { Firestore, collectionData, collection, addDoc, onSnapshot, getDocs, QuerySnapshot, deleteDoc, doc, updateDoc } from '@angular/fire/firestore';
import { getAuth, onAuthStateChanged } from '@angular/fire/auth';
import { Router } from '@angular/router';
// import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private http: HttpClient ,private firestore: Firestore , private router: Router) {
  }
  arrproduct: any[] = [];
  // arrproduct: Product[] = [
  //   {
  //     id: 1,
  //     basicdata: [
  //       {
  //         id: 1,
  //         name: 'camera1',
  //         description: 'this is camera',
  //         lang: [{ id: 1, name: 'english' }],
  //       },
  //     ],
  //     paymentmethod: [{ id: 1, name: 'visa' }],
  //     category: { id: 1, name: 'camera' },
  //     tags: [{ id: 1, name: 'camera' }],
  //     price: 2000,
  //     discount: 1000,
  //     imgurl: ['assets/img/bg-corporate-20-4-1.jpg'],
  //     relatedproducts: [5, 6, 7, 8],
  //   },
  //   {
  //     id: 2,
  //     basicdata: [
  //       {
  //         id: 1,
  //         name: 'camera2',
  //         description: 'this is camera',
  //         lang: [{ id: 1, name: 'english' }],
  //       },
  //     ],
  //     paymentmethod: [{ id: 1, name: 'visa' }],
  //     category: { id: 1, name: 'camera' },
  //     tags: [{ id: 1, name: 'camera' }],
  //     price: 4000,
  //     discount: 2000,
  //     imgurl: ['assets/img/bg-corporate-20-4-2.jpg'],
  //     relatedproducts: [6, 7, 8, 9],
  //   },
  //   {
  //     id: 3,
  //     basicdata: [
  //       {
  //         id: 1,
  //         name: 'camera3',
  //         description: 'this is camera',
  //         lang: [{ id: 1, name: 'english' }],
  //       },
  //     ],
  //     paymentmethod: [{ id: 1, name: 'visa' }],
  //     category: { id: 1, name: 'camera' },
  //     tags: [{ id: 1, name: 'camera' }],
  //     price: 5000,
  //     discount: 2000,
  //     imgurl: ['assets/img/bg-corporate-20-4-3.jpg'],
  //     relatedproducts: [7, 8, 9, 10],
  //   },
  //   {
  //     id: 4,
  //     basicdata: [
  //       {
  //         id: 1,
  //         name: 'phone1',
  //         description: 'this is Phone',
  //         lang: [{ id: 1, name: 'english' }],
  //       },
  //     ],
  //     paymentmethod: [{ id: 1, name: 'visa' }],
  //     category: { id: 1, name: 'phone' },
  //     tags: [{ id: 1, name: 'phone' }],
  //     price: 5000,
  //     discount: 200,
  //     imgurl: ['assets/img/Apple-iPhone-12-Pro-256.jpg'],
  //     relatedproducts: [8, 9, 10, 11],
  //   },
  //   {
  //     id: 5,
  //     basicdata: [
  //       {
  //         id: 1,
  //         name: 'phone2',
  //         description: 'this is Phone',
  //         lang: [{ id: 1, name: 'english' }],
  //       },
  //     ],
  //     paymentmethod: [{ id: 1, name: 'visa' }],
  //     category: { id: 1, name: 'phone' },
  //     tags: [{ id: 1, name: 'phone' }],
  //     price: 3000,
  //     imgurl: ['assets/img/Samsung-Galaxy-S20FE.jpg'],
  //     relatedproducts: [9, 10, 11, 12],
  //   },
  //   {
  //     id: 6,
  //     basicdata: [
  //       {
  //         id: 1,
  //         name: 'phone3',
  //         description: 'this is Phone',
  //         lang: [{ id: 1, name: 'english' }],
  //       },
  //     ],
  //     paymentmethod: [{ id: 1, name: 'visa' }],
  //     category: { id: 1, name: 'phone' },
  //     tags: [{ id: 1, name: 'phone' }],
  //     price: 4000,
  //     imgurl: ['assets/img/Samsung-S20-Ultra.jpg'],
  //     relatedproducts: [10, 11, 12, 13],
  //   },
  //   {
  //     id: 7,
  //     basicdata: [
  //       {
  //         id: 1,
  //         name: 'lap top1',
  //         description: 'this is lap tope',
  //         lang: [{ id: 1, name: 'english' }],
  //       },
  //     ],
  //     paymentmethod: [{ id: 1, name: 'visa' }],
  //     category: { id: 1, name: 'lap top' },
  //     tags: [{ id: 1, name: 'lap top' }],
  //     price: 5000,
  //     discount: 150,
  //     imgurl: ['assets/img/HP-ENVY-13-ba1020ne.jpg'],
  //     relatedproducts: [11, 12, 13, 14],
  //   },
  //   {
  //     id: 8,
  //     basicdata: [
  //       {
  //         id: 1,
  //         name: 'lap top2',
  //         description: 'this is lap tope',
  //         lang: [{ id: 1, name: 'english' }],
  //       },
  //     ],
  //     paymentmethod: [{ id: 1, name: 'visa' }],
  //     category: { id: 1, name: 'lap top' },
  //     tags: [{ id: 1, name: 'lap top' }],
  //     price: 6000,
  //     imgurl: ['assets/img/HP-Pavilion-Gaming-16.jpg'],
  //     relatedproducts: [11, 10, 13, 4],
  //   },
  //   {
  //     id: 9,
  //     basicdata: [
  //       {
  //         id: 1,
  //         name: 'lap top3',
  //         description: 'this is lap tope',
  //         lang: [{ id: 1, name: 'english' }],
  //       },
  //     ],
  //     paymentmethod: [{ id: 1, name: 'visa' }],
  //     category: { id: 1, name: 'lap top' },
  //     tags: [{ id: 1, name: 'lap top' }],
  //     price: 7000,
  //     imgurl: ['assets/img/dellg3i7.jpg'],
  //     relatedproducts: [10, 2, 13, 8],
  //   },
  //   {
  //     id: 10,
  //     basicdata: [
  //       {
  //         id: 1,
  //         name: 'camera4',
  //         description: 'this is camera',
  //         lang: [{ id: 1, name: 'english' }],
  //       },
  //     ],
  //     paymentmethod: [{ id: 1, name: 'visa' }],
  //     category: { id: 1, name: 'camera' },
  //     tags: [{ id: 1, name: 'camera' }],
  //     price: 2000,
  //     discount: 1000,
  //     imgurl: ['assets/img/bg-corporate-20-4-1.jpg'],
  //     relatedproducts: [13, 5, 9, 1],
  //   },
  //   {
  //     id: 11,
  //     basicdata: [
  //       {
  //         id: 1,
  //         name: 'camera5',
  //         description: 'this is camera',
  //         lang: [{ id: 1, name: 'english' }],
  //       },
  //     ],
  //     paymentmethod: [{ id: 1, name: 'visa' }],
  //     category: { id: 1, name: 'camera' },
  //     tags: [{ id: 1, name: 'camera' }],
  //     price: 4000,
  //     discount: 2000,
  //     imgurl: ['assets/img/bg-corporate-20-4-2.jpg'],
  //     relatedproducts: [11, 12, 13, 14],
  //   },
  //   {
  //     id: 12,
  //     basicdata: [
  //       {
  //         id: 1,
  //         name: 'camera6',
  //         description: 'this is camera',
  //         lang: [{ id: 1, name: 'english' }],
  //       },
  //     ],
  //     paymentmethod: [{ id: 1, name: 'visa' }],
  //     category: { id: 1, name: 'camera' },
  //     tags: [{ id: 1, name: 'camera' }],
  //     price: 5000,
  //     discount: 2000,
  //     imgurl: ['assets/img/bg-corporate-20-4-3.jpg'],
  //     relatedproducts: [11, 12, 13, 14],
  //   },
  //   {
  //     id: 13,
  //     basicdata: [
  //       {
  //         id: 1,
  //         name: 'camera7',
  //         description: 'this is camera',
  //         lang: [{ id: 1, name: 'english' }],
  //       },
  //     ],
  //     paymentmethod: [{ id: 1, name: 'visa' }],
  //     category: { id: 1, name: 'camera' },
  //     tags: [{ id: 1, name: 'camera' }],
  //     price: 2000,
  //     discount: 1000,
  //     imgurl: ['assets/img/bg-corporate-20-4-1.jpg'],
  //     relatedproducts: [11, 12, 13, 14],
  //   },
  //   {
  //     id: 14,
  //     basicdata: [
  //       {
  //         id: 1,
  //         name: 'camera8',
  //         description: 'this is camera',
  //         lang: [{ id: 1, name: 'english' }],
  //       },
  //     ],
  //     paymentmethod: [{ id: 1, name: 'visa' }],
  //     category: { id: 1, name: 'camera' },
  //     tags: [{ id: 1, name: 'camera' }],
  //     price: 4000,
  //     discount: 2000,
  //     imgurl: ['assets/img/bg-corporate-20-4-2.jpg'],
  //     relatedproducts: [11, 12, 13, 14],
  //   },
  //   {
  //     id: 15,
  //     basicdata: [
  //       {
  //         id: 1,
  //         name: 'camera9',
  //         description: 'this is camera',
  //         lang: [{ id: 1, name: 'english' }],
  //       },
  //     ],
  //     paymentmethod: [{ id: 1, name: 'visa' }],
  //     category: { id: 1, name: 'camera' },
  //     tags: [{ id: 1, name: 'camera' }],
  //     price: 5000,
  //     discount: 2000,
  //     imgurl: ['assets/img/bg-corporate-20-4-3.jpg'],
  //     relatedproducts: [11, 12, 13, 14],
  //   },
  //   {
  //     id: 16,
  //     basicdata: [
  //       {
  //         id: 1,
  //         name: 'camera10',
  //         description: 'this is camera',
  //         lang: [{ id: 1, name: 'english' }],
  //       },
  //     ],
  //     paymentmethod: [{ id: 1, name: 'visa' }],
  //     category: { id: 1, name: 'camera' },
  //     tags: [{ id: 1, name: 'camera' }],
  //     price: 2000,
  //     discount: 1000,
  //     imgurl: ['assets/img/bg-corporate-20-4-1.jpg'],
  //     relatedproducts: [11, 12, 13, 14],
  //   },
  //   {
  //     id: 17,
  //     basicdata: [
  //       {
  //         id: 1,
  //         name: 'camera11',
  //         description: 'this is camera',
  //         lang: [{ id: 1, name: 'english' }],
  //       },
  //     ],
  //     paymentmethod: [{ id: 1, name: 'visa' }],
  //     category: { id: 1, name: 'camera' },
  //     tags: [{ id: 1, name: 'camera' }],
  //     price: 4000,
  //     discount: 2000,
  //     imgurl: ['assets/img/bg-corporate-20-4-2.jpg'],
  //     relatedproducts: [11, 12, 13, 14],
  //   },
  //   {
  //     id: 18,
  //     basicdata: [
  //       {
  //         id: 1,
  //         name: 'camera12',
  //         description: 'this is camera',
  //         lang: [{ id: 1, name: 'english' }],
  //       },
  //     ],
  //     paymentmethod: [{ id: 1, name: 'visa' }],
  //     category: { id: 1, name: 'camera' },
  //     tags: [{ id: 1, name: 'camera' }],
  //     price: 5000,
  //     discount: 2000,
  //     imgurl: ['assets/img/bg-corporate-20-4-3.jpg'],
  //     relatedproducts: [11, 12, 13, 14],
  //   },
  //   {
  //     id: 19,
  //     basicdata: [
  //       {
  //         id: 1,
  //         name: 'phone4',
  //         description: 'this is Phone',
  //         lang: [{ id: 1, name: 'english' }],
  //       },
  //     ],
  //     paymentmethod: [{ id: 1, name: 'visa' }],
  //     category: { id: 1, name: 'phone' },
  //     tags: [{ id: 1, name: 'phone' }],
  //     price: 5000,
  //     discount: 200,
  //     imgurl: ['assets/img/Apple-iPhone-12-Pro-256.jpg'],
  //     relatedproducts: [11, 12, 13, 14],
  //   },
  //   {
  //     id: 20,
  //     basicdata: [
  //       {
  //         id: 1,
  //         name: 'phone5',
  //         description: 'this is Phone',
  //         lang: [{ id: 1, name: 'english' }],
  //       },
  //     ],
  //     paymentmethod: [{ id: 1, name: 'visa' }],
  //     category: { id: 1, name: 'phone' },
  //     tags: [{ id: 1, name: 'phone' }],
  //     price: 3000,
  //     imgurl: ['assets/img/Samsung-Galaxy-S20FE.jpg'],
  //     relatedproducts: [11, 12, 13, 14],
  //   },
  //   {
  //     id: 21,
  //     basicdata: [
  //       {
  //         id: 1,
  //         name: 'phone6',
  //         description: 'this is Phone',
  //         lang: [{ id: 1, name: 'english' }],
  //       },
  //     ],
  //     paymentmethod: [{ id: 1, name: 'visa' }],
  //     category: { id: 1, name: 'phone' },
  //     tags: [{ id: 1, name: 'phone' }],
  //     price: 4000,
  //     imgurl: ['assets/img/Samsung-S20-Ultra.jpg'],
  //     relatedproducts: [11, 12, 13, 14],
  //   },
  //   {
  //     id: 22,
  //     basicdata: [
  //       {
  //         id: 1,
  //         name: 'phone7',
  //         description: 'this is Phone',
  //         lang: [{ id: 1, name: 'english' }],
  //       },
  //     ],
  //     paymentmethod: [{ id: 1, name: 'visa' }],
  //     category: { id: 1, name: 'phone' },
  //     tags: [{ id: 1, name: 'phone' }],
  //     price: 5000,
  //     discount: 200,
  //     imgurl: ['assets/img/Apple-iPhone-12-Pro-256.jpg'],
  //     relatedproducts: [11, 12, 13, 14],
  //   },
  //   {
  //     id: 23,
  //     basicdata: [
  //       {
  //         id: 1,
  //         name: 'phone8',
  //         description: 'this is Phone',
  //         lang: [{ id: 1, name: 'english' }],
  //       },
  //     ],
  //     paymentmethod: [{ id: 1, name: 'visa' }],
  //     category: { id: 1, name: 'phone' },
  //     tags: [{ id: 1, name: 'phone' }],
  //     price: 3000,
  //     imgurl: ['assets/img/Samsung-Galaxy-S20FE.jpg'],
  //     relatedproducts: [11, 12, 13, 14],
  //   },
  //   {
  //     id: 24,
  //     basicdata: [
  //       {
  //         id: 1,
  //         name: 'phone9',
  //         description: 'this is Phone',
  //         lang: [{ id: 1, name: 'english' }],
  //       },
  //     ],
  //     paymentmethod: [{ id: 1, name: 'visa' }],
  //     category: { id: 1, name: 'phone' },
  //     tags: [{ id: 1, name: 'phone' }],
  //     price: 4000,
  //     imgurl: ['assets/img/Samsung-S20-Ultra.jpg'],
  //     relatedproducts: [11, 12, 13, 14],
  //   },
  //   {
  //     id: 25,
  //     basicdata: [
  //       {
  //         id: 1,
  //         name: 'phone10',
  //         description: 'this is Phone',
  //         lang: [{ id: 1, name: 'english' }],
  //       },
  //     ],
  //     paymentmethod: [{ id: 1, name: 'visa' }],
  //     category: { id: 1, name: 'phone' },
  //     tags: [{ id: 1, name: 'phone' }],
  //     price: 5000,
  //     discount: 200,
  //     imgurl: ['assets/img/Apple-iPhone-12-Pro-256.jpg'],
  //     relatedproducts: [11, 12, 13, 14],
  //   },
  //   {
  //     id: 26,
  //     basicdata: [
  //       {
  //         id: 1,
  //         name: 'phone11',
  //         description: 'this is Phone',
  //         lang: [{ id: 1, name: 'english' }],
  //       },
  //     ],
  //     paymentmethod: [{ id: 1, name: 'visa' }],
  //     category: { id: 1, name: 'phone' },
  //     tags: [{ id: 1, name: 'phone' }],
  //     price: 3000,
  //     imgurl: ['assets/img/Samsung-Galaxy-S20FE.jpg'],
  //     relatedproducts: [11, 12, 13, 14],
  //   },
  //   {
  //     id: 27,
  //     basicdata: [
  //       {
  //         id: 1,
  //         name: 'phone12',
  //         description: 'this is Phone',
  //         lang: [{ id: 1, name: 'english' }],
  //       },
  //     ],
  //     paymentmethod: [{ id: 1, name: 'visa' }],
  //     category: { id: 1, name: 'phone' },
  //     tags: [{ id: 1, name: 'phone' }],
  //     price: 4000,
  //     imgurl: ['assets/img/Samsung-S20-Ultra.jpg'],
  //     relatedproducts: [11, 12, 13, 14],
  //   },
  //   {
  //     id: 28,
  //     basicdata: [
  //       {
  //         id: 1,
  //         name: 'lap top4',
  //         description: 'this is lap tope',
  //         lang: [{ id: 1, name: 'english' }],
  //       },
  //     ],
  //     paymentmethod: [{ id: 1, name: 'visa' }],
  //     category: { id: 1, name: 'lap top' },
  //     tags: [{ id: 1, name: 'lap top' }],
  //     price: 5000,
  //     discount: 150,
  //     imgurl: ['assets/img/HP-ENVY-13-ba1020ne.jpg'],
  //     relatedproducts: [11, 12, 13, 14],
  //   },
  //   {
  //     id: 29,
  //     basicdata: [
  //       {
  //         id: 1,
  //         name: 'lap top5',
  //         description: 'this is lap tope',
  //         lang: [{ id: 1, name: 'english' }],
  //       },
  //     ],
  //     paymentmethod: [{ id: 1, name: 'visa' }],
  //     category: { id: 1, name: 'lap top' },
  //     tags: [{ id: 1, name: 'lap top' }],
  //     price: 6000,
  //     imgurl: ['assets/img/HP-Pavilion-Gaming-16.jpg'],
  //     relatedproducts: [11, 12, 13, 14],
  //   },
  //   {
  //     id: 30,
  //     basicdata: [
  //       {
  //         id: 1,
  //         name: 'lap top6',
  //         description: 'this is lap tope',
  //         lang: [{ id: 1, name: 'english' }],
  //       },
  //     ],
  //     paymentmethod: [{ id: 1, name: 'visa' }],
  //     category: { id: 1, name: 'lap top' },
  //     tags: [{ id: 1, name: 'lap top' }],
  //     price: 7000,
  //     imgurl: ['assets/img/dellg3i7.jpg'],
  //     relatedproducts: [11, 12, 13, 14],
  //   },
  //   {
  //     id: 31,
  //     basicdata: [
  //       {
  //         id: 1,
  //         name: 'lap top7',
  //         description: 'this is lap tope',
  //         lang: [{ id: 1, name: 'english' }],
  //       },
  //     ],
  //     paymentmethod: [{ id: 1, name: 'visa' }],
  //     category: { id: 1, name: 'lap top' },
  //     tags: [{ id: 1, name: 'lap top' }],
  //     price: 5000,
  //     discount: 150,
  //     imgurl: ['assets/img/HP-ENVY-13-ba1020ne.jpg'],
  //     relatedproducts: [11, 12, 13, 14],
  //   },
  //   {
  //     id: 32,
  //     basicdata: [
  //       {
  //         id: 1,
  //         name: 'lap top8',
  //         description: 'this is lap tope',
  //         lang: [{ id: 1, name: 'english' }],
  //       },
  //     ],
  //     paymentmethod: [{ id: 1, name: 'visa' }],
  //     category: { id: 1, name: 'lap top' },
  //     tags: [{ id: 1, name: 'lap top' }],
  //     price: 6000,
  //     imgurl: ['assets/img/HP-Pavilion-Gaming-16.jpg'],
  //     relatedproducts: [11, 12, 13, 14],
  //   },
  //   {
  //     id: 33,
  //     basicdata: [
  //       {
  //         id: 1,
  //         name: 'lap top9',
  //         description: 'this is lap tope',
  //         lang: [{ id: 1, name: 'english' }],
  //       },
  //     ],
  //     paymentmethod: [{ id: 1, name: 'visa' }],
  //     category: { id: 1, name: 'lap top' },
  //     tags: [{ id: 1, name: 'lap top' }],
  //     price: 7000,
  //     imgurl: ['assets/img/dellg3i7.jpg'],
  //     relatedproducts: [11, 12, 13, 14],
  //   },
  //   {
  //     id: 34,
  //     basicdata: [
  //       {
  //         id: 1,
  //         name: 'lap top10',
  //         description: 'this is lap tope',
  //         lang: [{ id: 1, name: 'english' }],
  //       },
  //     ],
  //     paymentmethod: [{ id: 1, name: 'visa' }],
  //     category: { id: 1, name: 'lap top' },
  //     tags: [{ id: 1, name: 'lap top' }],
  //     price: 5000,
  //     discount: 150,
  //     imgurl: ['assets/img/HP-ENVY-13-ba1020ne.jpg'],
  //     relatedproducts: [11, 12, 13, 14],
  //   },
  //   {
  //     id: 35,
  //     basicdata: [
  //       {
  //         id: 1,
  //         name: 'lap top11',
  //         description: 'this is lap tope',
  //         lang: [{ id: 1, name: 'english' }],
  //       },
  //     ],
  //     paymentmethod: [{ id: 1, name: 'visa' }],
  //     category: { id: 1, name: 'lap top' },
  //     tags: [{ id: 1, name: 'lap top' }],
  //     price: 6000,
  //     imgurl: ['assets/img/HP-Pavilion-Gaming-16.jpg'],
  //     relatedproducts: [11, 12, 13, 14],
  //   },
  // ];
  itemclick = new EventEmitter<Product>();
  itemsearch = new EventEmitter<string>();
  itemdelete = new EventEmitter<any>();
  allproduct = new EventEmitter<any>();
  auth = getAuth(this.firestore.app);


  async  getAllProducts()  :Promise<Product[]>  {
    this.arrproduct = [];
    const querySnapshot =await  getDocs(collection(this.firestore, "products"));
        querySnapshot.forEach((doc) => {
        console.log(`${doc.id} => ${doc.data()}`);
        this.arrproduct.push(doc.data());
      });
    return this.arrproduct;
  }
  getProduct(id: number): Product | any {
    return this.arrproduct.find((product) => product.id === id);
  }
  async addProduct(product: Product): Promise<Product[]> {
    onAuthStateChanged(this.auth, (user) => {
      if (user) {
        this.router.navigateByUrl('h');
        const course =  addDoc(collection(this.firestore,'products'),product);
        this.arrproduct.push(product);
      }
    });
    return [...this.arrproduct];

  }
  updateProduct(product: Product): Product[] {
    let i = this.arrproduct.findIndex((pro) => {
      pro.id === product.id;
    });
    this.arrproduct[i] = product;
    // updateDoc(doc(this.firestore,'products',ID),product);
    return [...this.arrproduct];
  }
  deleteProduct(id: string): Product[] {
    // let i = this.arrproduct.findIndex((p) => {
    //   return p.id === id;
    // });
    deleteDoc(doc(this.firestore,'Products',id));
    // console.log(i);
    // this.arrproduct.splice(i, 1);
    return this.arrproduct;
  }
}


