import { Component, Inject, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common'
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../services/product.service';
//import * as alertify from 'alertifyjs'
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material/dialog';
import moment from 'moment';

@Component({
  selector: 'app-modal-popup',
  templateUrl: './modal-popup.component.html',
  styleUrl: './modal-popup.component.css'
})
export class ModalPopupComponent implements OnInit {

  constructor(private productService: ProductService, public datepipe: DatePipe, public dialogref: MatDialogRef<ModalPopupComponent>,@Inject(MAT_DIALOG_DATA) public data:any) { }

  products: any;
  respdata: any;
  editdata: any;

  title:String = "Ajouter un produit";

  minDate = new Date(2020, 0, 1); // 1er janvier 2020

  latestDate: any;

  selectedDate = new Date();

  ngOnInit(): void {
    this.loadProducts();
    if(this.data.id!=null && this.data.id!=''){
      this.loadEditProduct(this.data.id);
      this.title = "Modifier un produit";
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
    id: new FormControl(null),
    label: new FormControl('', Validators.required),
    dci: new FormControl('', Validators.required),
    sectionPrice: new FormControl('', Validators.required),
    publicPrice: new FormControl('', Validators.required),
    cip: new FormControl('', Validators.required),
    ucd: new FormControl('', Validators.required),
    tva: new FormControl(),
    quantiteStock: new FormControl(),
    expirationDate: new FormControl('', Validators.required)
  });

  initializeFormGroup() {
    const format = 'DD/MM/YYYY';
    const dateObject = moment(this.editdata.expirationDate, format).toDate();
    this.form.setValue({
      id:this.editdata.id,
      label:this.editdata.label,
      dci:this.editdata.dci,
      sectionPrice:this.editdata.sectionPrice,
      publicPrice:this.editdata.publicPrice,
      cip:this.editdata.cip,
      ucd:this.editdata.ucd,
      tva:this.editdata.tva,
      quantiteStock:this.editdata.quantiteStock,
      expirationDate: dateObject
    });

  }

  saveProduct() {
    if (this.form.valid) {
      const nameControl = this.form.get('expirationDate');
      if (nameControl) {
        nameControl.setValue(this.latestDate);
      }
      this.productService.addProduct(this.form.value).subscribe(result => {
        this.respdata = result;
        //alertify.success("saved successfully.")
        this.dialogref.close();
      });
    } else {
      //alertify.error("Please Enter valid data")
    }
  }

  onDateChange(event: any) {
    this.selectedDate = event.value;
    this.latestDate = this.datepipe.transform(this.selectedDate, 'dd/MM/yyyy');
  }




}
