import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { ContainerComponent } from './components/container/container.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import {MatIconModule} from '@angular/material/icon';
import {MatSortModule} from '@angular/material/sort';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import {MatDialogModule} from '@angular/material/dialog';
import {HttpClientModule} from '@angular/common/http';
import { ModalPopupComponent } from './modal-popup/modal-popup.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { SupplierComponent } from './components/supplier/supplier.component';
import { ModalPopupSupplierComponent } from './modal/modal-popup-supplier/modal-popup-supplier.component';
import { MatNativeDateModule, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MY_DATE_FORMATS } from './models/date-format';
import { DatePipe } from '@angular/common';
import { PurchaseComponent } from './components/purchase/purchase.component';
import { MatSelectModule } from '@angular/material/select';
import { CurrencyXofPipe } from './pipe/currency-xof.pipe';
import { ModalPopupProductComponent } from './modal/modal-popup-product/modal-popup-product.component';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { SaleComponent } from './components/sale/sale.component';
import { CommandListComponent } from './components/command-list/command-list.component';
import { SaleListComponent } from './components/sale-list/sale-list.component';
import { StockComponent } from './components/stock/stock.component';
import { ProdcutAddComponent } from './components/prodcut-add/prodcut-add.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    ContainerComponent,
    ProductListComponent,
    ModalPopupComponent,
    SupplierComponent,
    ModalPopupSupplierComponent,
    PurchaseComponent,
    CurrencyXofPipe,
    ModalPopupProductComponent,
    SaleComponent,
    CommandListComponent,
    SaleListComponent,
    StockComponent,
    ProdcutAddComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatTableModule,
    MatPaginatorModule,
    MatIconModule,
    MatSortModule,
    ReactiveFormsModule,
    FormsModule,
    MatInputModule,
    MatDialogModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatListModule,
    MatMenuModule,
    MatAutocompleteModule,
  ],
  providers: [
    provideAnimationsAsync(),
    { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS },
    { provide: MAT_DATE_LOCALE, useValue: 'fr-FR' },
    DatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
