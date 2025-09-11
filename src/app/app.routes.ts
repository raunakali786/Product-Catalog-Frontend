import { Routes } from '@angular/router';
import { ProductsComponent } from './pages/products/products';
import { AddProduct } from './pages/add-product/add-product';
import { EditProduct } from './pages/edit-product/edit-product';

export const routes: Routes = [
  { path: '', redirectTo: 'products', pathMatch: 'full' },
  { path: 'products', component: ProductsComponent },
  { path: 'add-product', component: AddProduct },
  { path: 'edit-product/:id', component: EditProduct },
  { path: '**', component: ProductsComponent }
];
