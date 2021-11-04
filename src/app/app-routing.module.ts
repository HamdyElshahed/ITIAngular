import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { PagenotfoundComponent } from './components/pagenotfound/pagenotfound.component';



const routes: Routes = [
  {path: 'h' , component: HomeComponent},
  {path: 'home' , redirectTo:'', pathMatch: 'full'},
  {path: 'register' ,component: RegisterComponent},
  {path: 'login' ,component: LoginComponent},
  {path: 'product', loadChildren:()=> import('src/app/product.module').then((m)=> m.ProductModule) },
  { path: '**', component: PagenotfoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes , {preloadingStrategy: PreloadAllModules , scrollPositionRestoration : 'top'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
