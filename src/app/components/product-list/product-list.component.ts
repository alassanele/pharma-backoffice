import { Component, OnInit, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';

import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog'

import { Product } from '../../models/product';

import { ProductService } from '../../services/product.service';

import { ModalPopupComponent } from './../../modal-popup/modal-popup.component';

// @ts-ignore
@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent implements OnInit, AfterViewInit{//, OnDestroy{

  products:Product[] = [];

  displayedColumns: string[]=
    ['id', 'label','dci','sectionPrice','publicPrice','cip','ucd','tva','quantiteStock','actions'];

  dataSource = new MatTableDataSource<Product>;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  searchKey: string = '';

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  constructor(private productService: ProductService,
              private dialog: MatDialog) {
  }

  /*
  ngOnDestroy(): void {
       this.productsSub?.unsubscribe();
     }
*/

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts(){
    this.productService.getProducts().subscribe(result => {
      this.products = result;

      this.dataSource = new MatTableDataSource<Product>(this.products)
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  /*
  viewProduct() {
    console.log('View Product');
  }*/


  onSearchClear(){
    this.searchKey = '';
    this.applyFilter();
  }


  applyFilter(){
    this.dataSource.filter = this.searchKey.trim().toLowerCase();
  }


  onCreate(){
    //this.service.initializeFormGroup();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";

    //this.dialog.open("ProductComponent", dialogConfig);
  }

  onEdit(row: Product){
    this.OpenDialog('1000ms','600ms',row.id)
  }

  onDelete(row: Product){
    this.productService.deleteProduct(row.id).subscribe(result => {
      this.getProducts();
      //alertify.success("Removed successfully.")
    });
  }

  OpenDialog(enteranimation: any, exitanimation: any,code:any) {

    this.dialog.open(ModalPopupComponent, {
      enterAnimationDuration: enteranimation,
      exitAnimationDuration: exitanimation,
      width: "50%",
      data:{
        empcode:code
      }
    })
  }

}
