import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';

import { DatePipe } from '@angular/common'

import { Purchase } from '../../models/purchase';

import { Supplier } from '../../models/supplier';

import { Command } from '../../models/command';

import { Product } from '../../models/product';

import { LineCommand } from '../../models/line-command';

import { ProductService } from '../../services/product.service';

import { SupplierService } from '../../services/supplier.service';

import { CommandService } from '../../services/command.service';

import { MatSelectChange } from '@angular/material/select';

@Component({
  selector: 'app-purchase',
  templateUrl: './purchase.component.html',
  styleUrl: './purchase.component.css'
})
export class PurchaseComponent implements OnInit{

  displayedColumns: string[] = ['label', 'quantity', 'unitPrice', 'discount', 'total', 'actions'];

  dataSource: Purchase[] = [];

  suppliers:Supplier[] = [];

  selectedSupplier: number

  totalNet: number = 0;

  //command: Command;

  //lineCommands: LineCommand[] = []

  constructor(private productService: ProductService,
              private supplierService: SupplierService,
              private commandService: CommandService,
              public datepipe: DatePipe,) {
  }

  ngOnInit(): void {
    this.getProducts();
    this.supplierService.getSuppliers().subscribe(result => {
      this.suppliers = result;
    });
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
    this.totalNet = this.dataSource.reduce((acc, product) => acc + product.total, 0);
  }

  onSupplierChange(event: MatSelectChange): void {
    console.log('Selected supplier ID:', event.value);
    console.log('Source MatSelect component:', event.source);
    this.selectedSupplier = event.value;
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
  }*/

  onSave() {
    const command = this.buildCommand();
    console.log("Command to save:", command);
    this.commandService.saveCommand(command).subscribe(
      result => console.log('Command saved:', result),
      error => console.error('Error saving command:', error)
    );
  }

  private buildCommand(): Command {
    const command = new Command(this.buildLineCommands(),"20/09/2024", this.selectedSupplier, this.totalNet);
    /*
    command.lineCommands = this.buildLineCommands();
    command.supplierId = this.selectedSupplier;
    command.commandDate = "20/09/2024";
    command.totalNet = this.totalNet;
     */
    return command;
  }

  private buildLineCommands(): LineCommand[] {
    return this.dataSource.map(row => new LineCommand(row.id, row.quantity, row.total));
  }

  /*

  private buildLineCommand(row: any): LineCommand {
    const lineCommand = new LineCommand(row.id, row.quantity);

    lineCommand.quantity = row.quantity;
    lineCommand.productId = row.id;

    return lineCommand;
  }
*/




}
