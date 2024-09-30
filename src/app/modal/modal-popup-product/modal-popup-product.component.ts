import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSelectionList } from '@angular/material/list';

import { Product } from '../../models/product';

import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-modal-popup-product',
  templateUrl: './modal-popup-product.component.html',
  styleUrl: './modal-popup-product.component.css'
})
export class ModalPopupProductComponent implements OnInit{

  products: Product[];

  selectedProducts:Product[] = [];

  idProductsSeleted:number[] = [];

  @ViewChild('currentProduct') currentProduct: MatSelectionList;

  constructor(public dialogRef: MatDialogRef<ModalPopupProductComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private productService: ProductService) {
    this.idProductsSeleted = data;
  }

  ngOnInit(): void {
    console.log('Data:', this.data);
    this.initProducts();
    this.selectedProducts = [];
  }

  initProducts(){
    if(this.idProductsSeleted.length == 0){
      this.productService.getProducts().subscribe(result => {
        this.products = result;
      });
    }else {
      this.productService.getProductWithoutIds(this.idProductsSeleted.join(',')).subscribe(result => {
        this.products = result;
      });
    }
  }

  onConfirm(): void {
    this.dialogRef.close(this.selectedProducts);
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  getSelectedProducts() {
    this.selectedProducts = this.currentProduct.selectedOptions.selected.map(option => option.value);
  }
}
