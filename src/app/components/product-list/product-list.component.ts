import { Component, OnInit, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';

import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import {MatSort} from '@angular/material/sort';

import { Product } from '../../models/product';

import { ProductService } from '../../services/product.service';

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

  //productsSub : Subscription | undefined;

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  constructor(private productService: ProductService) {
    this.products = productService.getProducts();
  }

  /*
  ngOnDestroy(): void {
       this.productsSub?.unsubscribe();
     }
*/

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource(this.productService.getProducts());
    /*
    this.productsSub = this.productService.getProducts().subscribe({
      next:(products: Product[])=> {
        this.dataSource = new MatTableDataSource( products);
      },
      error:(error:any)=> {
        console.log("Error : ", error)
      },
      complete:()=> {
        console.log("Complete !")
      },
    }
  )*/

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

}
