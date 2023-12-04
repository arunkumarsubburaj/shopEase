import { Routes } from '@angular/router';
import { UnderConstructionComponent } from './under-construction/under-construction.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  { path: 'home', loadChildren: () => import('./home/home.module').then(m => m.HomeModule) },
  { path: 'products', loadChildren: () => import('./products/products.module').then(m => m.ProductsModule) },
  {path: "**", component: UnderConstructionComponent}
  // Other routes
];
