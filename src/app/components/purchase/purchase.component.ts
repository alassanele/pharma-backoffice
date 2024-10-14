import { Component, OnInit, ViewChild } from '@angular/core';
import { DatePipe } from '@angular/common'
import { MatSelectChange } from '@angular/material/select';
import {MatDialog} from '@angular/material/dialog'

import { Purchase } from '../../models/purchase';
import { Supplier } from '../../models/supplier';
import { Command } from '../../models/command';
import { Product } from '../../models/product';
import { LineCommand } from '../../models/line-command';

import { SupplierService } from '../../services/supplier.service';
import { CommandService } from '../../services/command.service';

import { MatTable } from '@angular/material/table';

import { ModalPopupProductComponent } from './../../modal/modal-popup-product/modal-popup-product.component';

@Component({
  selector: 'app-purchase',
  templateUrl: './purchase.component.html',
  styleUrl: './purchase.component.css'
})
export class PurchaseComponent implements OnInit{

  @ViewChild(MatTable) table: MatTable<any>;

  displayedColumns: string[] = ['label', 'quantity', 'unitPrice', 'discount', 'total', 'actions'];

  dataSource: Purchase[] = [];

  suppliers:Supplier[] = [];

  selectedSupplier: number

  totalNet: number = 0;

  selectedProducts:Product[] = [];

  idProductsSeleted:number[] = [];

  constructor(private supplierService: SupplierService,
              private commandService: CommandService,
              public datepipe: DatePipe,
              private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.initProducts();
    this.supplierService.getSuppliers().subscribe(result => {
      this.suppliers = result;
    });
    console.log('dataSource:', 1);
  }

  initProducts(){
    this.selectedProducts.forEach(product => {
      this.dataSource.push({
        id: product.id,
        label: product.label,
        quantity: 0,
        unitPrice: Number(product.publicPrice),
        discount: Number(product.tva),
        total: 0
      });
    });
    if(this.selectedProducts.length > 0){
      this.table.renderRows();
    }
  }

  onDelete(row: Purchase){
    this.dataSource = this.dataSource.filter(product => product.id !== row.id);
  }

  onQuantityChange(row: any): void {
    this.calculateTotal(row);
  }

  calculateTotal(row: any): void {
    row.total = row.quantity * row.unitPrice;
    this.totalNet = this.dataSource.reduce((acc, product) => acc + product.total, 0);
  }

  onSupplierChange(event: MatSelectChange): void {
    this.selectedSupplier = event.value;
  }

  onSave() {
    const command = this.buildCommand();
    this.commandService.saveCommand(command).subscribe(
      result => console.log('Command saved:', result),
      error => console.error('Error saving command:', error)
    );
  }

  private buildCommand(): Command {
    return new Command(this.buildLineCommands(),"20/09/2024", this.selectedSupplier, this.totalNet);
  }

  private buildLineCommands(): LineCommand[] {
    return this.dataSource.map(row => new LineCommand(row.id, row.quantity, row.total));
  }

  openProductSelection(): void {
    this.dataSource.forEach(product => this.idProductsSeleted.push(product.id));
    const dialogRef = this.dialog.open(ModalPopupProductComponent, {
      width: '50%',
      data: this.idProductsSeleted,
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.selectedProducts = result;
        this.initProducts();
      }
    });
  }
}
