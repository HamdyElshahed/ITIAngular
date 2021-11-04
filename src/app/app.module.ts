import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/layout/header/header.component';
import { PagenotfoundComponent } from './components/pagenotfound/pagenotfound.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ProductModule } from './product.module';
import { provideFirebaseApp, getApp, initializeApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { RegisterComponent } from './auth/register/register.component';
import { LoginComponent } from './auth/login/login.component';
import { InterceptorService } from './services/interceptor.service';
import { HomeComponent } from './components/home/home.component';
import { ContainerItemsComponent } from './components/core/container-items/container-items.component';
const config ={
  apiKey: 'AIzaSyAKhf8lwcWoqvl5wNQ9k3ouO4V6lhsG4Es',
  authDomain: 'e-commerce-32724.firebaseapp.com',
  projectId: 'e-commerce-32724',
  storageBucket: 'e-commerce-32724.appspot.com',
  messagingSenderId: '43353862408',
  appId: '1:43353862408:web:1f567d12548067dab87cbd',
};

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    PagenotfoundComponent,
    RegisterComponent,
    LoginComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    ProductModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    provideFirebaseApp(() => initializeApp(config)),
    provideFirestore(() => getFirestore()),
  ],
  exports: [],
  providers: [{provide: HTTP_INTERCEPTORS, useClass:InterceptorService , multi : true} ],
  bootstrap: [AppComponent]
})
export class AppModule { }
