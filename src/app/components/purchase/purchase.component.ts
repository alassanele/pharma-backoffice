import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';

import { Purchase } from '../../models/purchase';

import { Product } from '../../models/product';

import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-purchase',
  templateUrl: './purchase.component.html',
  styleUrl: './purchase.component.css'
})
export class PurchaseComponent implements OnInit{

  displayedColumns: string[] = ['label', 'quantity', 'unitPrice', 'discount', 'total', 'actions'];

  dataSource: Purchase[] = [];

  constructor(private productService: ProductService) {
  }

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts(){
    this.productService.getProducts().subscribe(result => {
      this.dataSource = result.map(product => ({
        id: product.id,
        label: product.label,
        quantity: 0,
        unitPrice: Number(product.publicPrice),
        discount: Number(product.tva),
        total: 0
      }));
    });
  }

  onDelete(row: Purchase){
    this.dataSource = this.dataSource.filter(product => product.id !== row.id);
  }

  // This method will be called when the quantity is changed
  onQuantityChange(row: any): void {
    this.calculateTotal(row);
  }

  // Function to calculate the total based on quantity, unit price, and discount (if applicable)
  calculateTotal(row: any): void {
    const discountMultiplier = row.discount ? (100 - row.discount) / 100 : 1;
    row.total = row.quantity * row.unitPrice * discountMultiplier;
  }

  /*
 dataSource: Purchase[] = [
   { id: 1, label: 'Jules', quantity: 1, unitPrice: 12, discount: 0, total: 1000 },
   { id: 2, label: 'Jean', quantity: 2, unitPrice: 13, discount: 0, total: 2000 }
 ];*/

  /*
  editedRowIndex: number;

  startEditing(index: number) {
    this.editedRowIndex = index;
  }

  cancelEditing() {
    this.editedRowIndex = -1;
  }

  saveRow(row: UserData) {
    // Perform the save operation here, such as making an API call
    console.log('Saving row', row);
    this.editedRowIndex = -1;
  }*/


}
