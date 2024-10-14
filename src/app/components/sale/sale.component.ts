import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import {MatSort} from '@angular/material/sort';

import { Product } from '../../models/product';
import { LineSold } from '../../models/line-sold';
import { Sale } from '../../models/sale';

import { ProductService } from '../../services/product.service';
import { SaleService } from '../../services/sale.service';

@Component({
  selector: 'app-sale',
  templateUrl: './sale.component.html',
  styleUrl: './sale.component.css'
})
export class SaleComponent implements OnInit{

  @ViewChild(MatSort) sort: MatSort;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  products:Product[] = [];

  filteredProducts: Observable<Product[]>;

  dataSource = new MatTableDataSource<LineSold>;

  productMap: Map<number, Product> = new Map<number, Product>();

  displayedColumns: string[] = ['label', 'quantity', 'unitPrice', 'totalAmount', 'actions'];

  productControl = new FormControl();

  totalNet: number = 0;

  constructor(private productService: ProductService,
              private saleService: SaleService) {
  }

  ngOnInit(): void {
    this.initProducts();
    this.filteredProducts = this.productControl.valueChanges.pipe(
      startWith(''),
      map(value => this.filterProducts(value))
    );
  }

  initProducts(){
    this.productService.getProducts().subscribe(result => {
      this.products = result;
      result.forEach(product => {
        this.productMap.set(product.id, product);
      });
    });
  }

  private filterProducts(value: string): Product[] {
    return this.products.filter(product => product.label.toLowerCase().includes(value));
  }

  addProduct() {
    const selectedProductName = this.productControl.value;
    const selectedProduct = this.products.find(product => product.label === selectedProductName);

    if (selectedProduct) {
      this.dataSource.data.push({
        id: selectedProduct.id,
        productId: selectedProduct.id,
        quantiteVendu: 0,
        totalAmount: 0
      });
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.productControl.reset();
      this.products = this.products.filter(product => product !== selectedProduct);
    }
  }

  onDelete(row: LineSold){
    this.dataSource.data = this.dataSource.data.filter(lineSold => lineSold.productId !== row.productId);;
    this.totalNet = this.dataSource.data.reduce((acc, lineSold) => acc + lineSold.totalAmount, 0);
  }

  onQuantityChange(row: LineSold): void {
    row.totalAmount = row.quantiteVendu * Number(this.getPublicPriceProduct(row.productId));
    this.totalNet = this.dataSource.data.reduce((acc, lineSold) => acc + lineSold.totalAmount, 0);
  }

  onSave(){
    this.saleService.saveSale(new Sale(this.dataSource.data,"20/09/2024", this.totalNet)).subscribe(
      result => console.log('Sale saved:', result),
      error => console.error('Error saving command:', error)
    );
  }

  getLabelProduct(idProduct: number): string {
    return this.productMap?.get(idProduct)?.label || '';
  }

  getPublicPriceProduct(idProduct: number): number {
    return Number(this.productMap?.get(idProduct)?.publicPrice) || 0;
  }
}
