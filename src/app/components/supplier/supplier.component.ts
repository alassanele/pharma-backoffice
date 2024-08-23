import { Component, OnInit, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';

import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import {MatDialog} from '@angular/material/dialog'

import { Supplier } from '../../models/supplier';

import { SupplierService } from '../../services/supplier.service';

import { ModalPopupSupplierComponent } from './../../modal/modal-popup-supplier/modal-popup-supplier.component';

@Component({
  selector: 'app-supplier',
  templateUrl: './supplier.component.html',
  styleUrl: './supplier.component.css'
})
export class SupplierComponent implements OnInit, AfterViewInit{//, OnDestroy{

  suppliers:Supplier[] = [];

  displayedColumns: string[]=
    ['name','adress','numberPhone','email','actions'];

  dataSource = new MatTableDataSource<Supplier>;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  searchKey: string = '';

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  constructor(private supplierService: SupplierService,
              private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts(){
    this.supplierService.getSuppliers().subscribe(result => {
      this.suppliers = result;

      this.dataSource = new MatTableDataSource<Supplier>(this.suppliers)
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  onSearchClear(){
    this.searchKey = '';
    this.applyFilter();
  }

  applyFilter(){
    this.dataSource.filter = this.searchKey.trim().toLowerCase();
  }

  onCreate(){
    //this.openDialog('1000ms','600ms','')

    const dialogRef = this.dialog.open(ModalPopupSupplierComponent, {
      enterAnimationDuration: '1000ms',
      exitAnimationDuration: '600ms',
      width: "50%",
      data:{
        id:''
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getProducts();
    });
  }

  onEdit(row: Supplier){
    //this.openDialog('1000ms','600ms',row.id);

    const dialogRef = this.dialog.open(ModalPopupSupplierComponent, {
      enterAnimationDuration: '1000ms',
      exitAnimationDuration: '600ms',
      width: "50%",
      data:{
        id:row.id
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getProducts();
    });

  }

  onDelete(row: Supplier){
    this.supplierService.deleteSupplier(row.id).subscribe(result => {
      this.getProducts();
      //alertify.success("Removed successfully.")
    });
  }

  openDialog(enteranimation: any, exitanimation: any,idProduct:any) {

    this.dialog.open(ModalPopupSupplierComponent, {
      enterAnimationDuration: enteranimation,
      exitAnimationDuration: exitanimation,
      width: "50%",
      data:{
        id:idProduct
      }
    })
  }

}
