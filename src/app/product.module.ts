import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { AddproductComponent } from "./components/addproduct/addproduct.component";
import { AsideFilterComponent } from "./components/core/aside-filter/aside-filter.component";
import { AsideComponent } from "./components/core/aside/aside.component";
import { ContainerItemsComponent } from "./components/core/container-items/container-items.component";
import { ItemComponent } from "./components/core/container-items/item/item.component";
import { ProductdetailsComponent } from "./components/productdetails/productdetails.component";
import { AuthguardService } from "./services/authguard.service";

@NgModule({
  declarations: [
    ContainerItemsComponent,
    ItemComponent,
    ProductdetailsComponent,
    AddproductComponent,
    AsideComponent,
    AsideFilterComponent
  ],
  imports: [
    RouterModule.forChild([
      {path: '' , children: [
        {path: 'allproduct' , component: ContainerItemsComponent},
        {path: 'add' , component: AddproductComponent, canActivate:[AuthguardService] },
        {path: 'edit/:id' , component: AddproductComponent},
        {path: 'details/:id' , component: ProductdetailsComponent},
      ]},
    ]),
    CommonModule,
    FormsModule
  ],
  exports: []
})
export class ProductModule { }
