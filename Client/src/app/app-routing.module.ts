import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignupComponent } from './components/auth/signup/signup.component';
import { NoLoginGuard } from './guards/NoLoginGuard';
import { EnterToAppComponent } from './components/enter-to-app/enter-to-app.component';
import { ShoppingPageComponent } from './components/shopping-page/shopping-page.component';
import { ProductaddUpdateComponent } from './components/productadd-update/productadd-update.component';
import { AddCategoryComponent } from './components/add-category/add-category.component';
import { OrderComponent } from './components/order/order.component';
import { AdminGuard } from './guards/admin.guard';

const routes: Routes = [
  {path: '', component: EnterToAppComponent, pathMatch: 'full'},
  {path: 'home', component: EnterToAppComponent},
  {path: 'signup', component: SignupComponent},
  {path: 'shopping/:cartID', component: ShoppingPageComponent, canActivate:[NoLoginGuard]},
  {path: 'admin-product', component: ProductaddUpdateComponent, canActivate:[AdminGuard]},
  {path: 'add-category', component: AddCategoryComponent, canActivate:[AdminGuard]},
  {path: 'order/:cartID', component: OrderComponent, canActivate:[NoLoginGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
