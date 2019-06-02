import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';



import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { LoginComponent } from './components/auth/login/login.component';
import { SignupComponent } from './components/auth/signup/signup.component';
import { HomeComponent } from './components/home/home.component';
import { EnterToAppComponent } from './components/enter-to-app/enter-to-app.component';
import { ShoppingPageComponent } from './components/shopping-page/shopping-page.component';
import { MyCartComponent } from './components/my-cart/my-cart.component';
import { ProductaddUpdateComponent } from './components/productadd-update/productadd-update.component';
import { AddCategoryComponent } from './components/add-category/add-category.component';
import { LoaderComponent } from './components/loader/loader.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    SignupComponent,
    HomeComponent,
    EnterToAppComponent,
    ShoppingPageComponent,
    MyCartComponent,
    ProductaddUpdateComponent,
    AddCategoryComponent,
    LoaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
