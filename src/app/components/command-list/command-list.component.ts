import { Component, OnInit, ViewChild } from '@angular/core';
import { DatePipe } from '@angular/common';

import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import { MatTable } from '@angular/material/table';

import { Product } from '../../models/product';
import { Command } from '../../models/command';

import { CommandService } from '../../services/command.service';
import { SupplierService } from '../../services/supplier.service';

@Component({
  selector: 'app-command-list',
  templateUrl: './command-list.component.html',
  styleUrl: './command-list.component.css'
})
export class CommandListComponent implements OnInit{

  @ViewChild(MatTable) table: MatTable<any>;

  @ViewChild(MatSort) sort: MatSort;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  dataSource = new MatTableDataSource<Command>;

  displayedColumns: string[] = ['label', 'commandDate', 'totalAmount', 'actions'];

  commands:Command[] = [];

  products:Product[] = [];

  productMap: Map<number, string> = new Map<number, string>();

  constructor(private commandService: CommandService,
              private supplierService: SupplierService,
              public datepipe: DatePipe) {
  }

  ngOnInit(): void {
    this.initCommands();
    this.buildMapIdLabel();
  }

  initCommands(){
    this.commandService.getCommands().subscribe(result => {
      this.commands = result;
      this.dataSource = new MatTableDataSource<Command>(this.commands)
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  buildMapIdLabel(): void {
    this.supplierService.getSuppliers().subscribe(result => {
        result.forEach(supplier => {
        this.productMap.set(supplier.id, supplier.name);
      });
    });
    console.log('productMap:', this.productMap);
  }

  getLabelSupplier(idSupplier: number): string {
    // @ts-ignore
    return this.productMap.get(idSupplier);
  }

  onEdit(row: Command){
    /*

    const dialogRef = this.dialog.open(ModalPopupSupplierComponent, {
      enterAnimationDuration: '1000ms',
      exitAnimationDuration: '600ms',
      width: "30%",
      data:{
        id:row.id
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getProducts();
    });*/

  }

  onDelete(row: Command){/*
    this.supplierService.deleteSupplier(row.id).subscribe(result => {
      this.getProducts();
      //alertify.success("Removed successfully.")
    });*/
  }
}
