import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

import { Product } from '../../models/product';

import { LineSold } from '../../models/line-sold';
import { Sale } from '../../models/sale';

import { ProductService } from '../../services/product.service';
import { SaleService } from '../../services/sale.service';

import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import {MatSort} from '@angular/material/sort';

@Component({
  selector: 'app-sale',
  templateUrl: './sale.component.html',
  styleUrl: './sale.component.css'
})
export class SaleComponent implements OnInit{

  productControl = new FormControl();

  displayedColumns: string[] = ['label', 'quantity', 'unitPrice', 'totalAmount', 'actions'];

  products:Product[] = [];

  filteredProducts: Observable<Product[]>;

  selectedProducts: Product[] = [];

  lineSolds: LineSold[] = [];

  dataSource = new MatTableDataSource<LineSold>;

  productMap: Map<number, Product> = new Map<number, Product>();

  @ViewChild(MatSort) sort: MatSort;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private productService: ProductService,
              private saleService: SaleService) {
  }

  ngOnInit(): void {
    this.initProducts();
    this.filteredProducts = this.productControl.valueChanges.pipe(
      startWith(''),
      map(value => this.filterProducts(value))
    );
    console.log('dataSource:', 1);
    this.buildMapIdLabel();
  }

  initProducts(){
    this.productService.getProducts().subscribe(result => {
      this.products = result;
    });
  }

  private filterProducts(value: string): Product[] {
    return this.products.filter(product => product.label.toLowerCase().includes(value));
  }

  addProduct() {
    const selectedProductName = this.productControl.value;
    const selectedProduct = this.products.find(product => product.label === selectedProductName);

    if (selectedProduct && !this.selectedProducts.includes(selectedProduct)) {
      this.selectedProducts.push(selectedProduct);
      this.lineSolds.push({
        id: selectedProduct.id,
        productId: selectedProduct.id,
        quantiteVendu: 0,
        totalAmount: 0
      });
      this.productControl.reset();
    }

    //Mettre à jour la liste des produits sélectionnés cette liste en enlevant le produit sélectionné

    this.dataSource = new MatTableDataSource<LineSold>(this.lineSolds)
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  onDelete(row: LineSold){
    const filteredData = this.dataSource.data.filter(lineSold => lineSold.productId !== row.productId);
    this.dataSource.data = filteredData;
  }

  onQuantityChange(row: any): void {
    this.calculateTotal(row);
  }

  calculateTotal(row: LineSold): void {
    row.totalAmount = row.quantiteVendu * Number(this.getPublicPriceProduct(row.productId));
  }

  onSave(){
    console.log('this.dataSource.data:', this.dataSource.data);
    this.saleService.saveSale(new Sale(this.dataSource.data,"20/09/2024", 0)).subscribe(
      result => console.log('Sale saved:', result),
      error => console.error('Error saving command:', error)
    );
  }

  buildMapIdLabel(): void {
    this.productService.getProducts().subscribe(result => {
      result.forEach(product => {
        this.productMap.set(product.id, product);
      });
    });
    console.log('productMap:', this.productMap);
  }

  getLabelProduct(idProduct: number): string {
    const product = this.productMap?.get(idProduct);
    return product?.label || '';
  }

  getPublicPriceProduct(idProduct: number): number {
    const product = this.productMap?.get(idProduct);
    return Number(product?.publicPrice) || 0;
  }
}
