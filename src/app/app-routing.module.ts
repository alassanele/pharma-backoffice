import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductListComponent } from './components/product-list/product-list.component';
import { SupplierComponent } from './components/supplier/supplier.component';
import { PurchaseComponent } from './components/purchase/purchase.component';
import { CommandListComponent } from './components/command-list/command-list.component';
import { SaleComponent } from './components/sale/sale.component';

const routes: Routes = [
  { path: '', component: ProductListComponent },
  { path: 'products', component: ProductListComponent },
  { path: 'suppliers', component: SupplierComponent },
  { path: 'purchase', component: PurchaseComponent },
  { path: 'commands', component: CommandListComponent },
  { path: 'new-sale', component: SaleComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
