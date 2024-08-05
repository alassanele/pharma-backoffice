import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../services/product.service';
//import * as alertify from 'alertifyjs'
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-popup',
  templateUrl: './modal-popup.component.html',
  styleUrl: './modal-popup.component.css'
})
export class ModalPopupComponent implements OnInit {

  constructor(private productService: ProductService, public dialogref: MatDialogRef<ModalPopupComponent>,@Inject(MAT_DIALOG_DATA) public data:any) { }

  products: any;
  respdata: any;
  editdata: any;

  ngOnInit(): void {
    this.loadProducts();
    if(this.data.id!=null && this.data.id!=''){
      this.loadEditProduct(this.data.id);
    }
  }

  loadProducts() {
    this.productService.getProducts().subscribe(result => {
      this.products = result;
    });
  }

  loadEditProduct(idProduct: any) {
    this.productService.editProduct(idProduct).subscribe(item => {
      this.editdata = item;
      console.log(this.editdata);
      this.initializeFormGroup();
    });
  }


  form: FormGroup = new FormGroup({
    //$key: new FormControl(null),
    label: new FormControl('', Validators.required),
    dci: new FormControl('', Validators.required),
    sectionPrice: new FormControl('', Validators.required),
    publicPrice: new FormControl('', Validators.required),
    cip: new FormControl(),
    ucd: new FormControl(),
    tva: new FormControl(),
    quantiteStock: new FormControl()
  });

  initializeFormGroup() {
    this.form.setValue({
      label:this.editdata.label,
      dci:this.editdata.dci,
      sectionPrice:this.editdata.sectionPrice,
      publicPrice:this.editdata.publicPrice,
      cip:this.editdata.cip,
      ucd:this.editdata.ucd,
      tva:this.editdata.tva,
      quantiteStock:this.editdata.quantiteStock
    });
  }

  saveProduct() {
    if (this.form.valid) {
      this.productService.addProduct(this.form.value.name).subscribe(result => {
        this.respdata = result;
        if (this.respdata.result == 'pass') {
          //alertify.success("saved successfully.")
          this.dialogref.close();
        }
      });

    } else {
      //alertify.error("Please Enter valid data")
    }
  }

}
