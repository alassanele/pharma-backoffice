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
    if(this.data.empcode!=null && this.data.empcode!=''){
      this.loadEditProduct(this.data.empcode);
    }
  }

  loadProducts() {
    this.productService.getProducts().subscribe(result => {
      this.products = result;
    });
  }

  loadEditProduct(code: any) {
    this.productService.editProduct(code).subscribe(item => {
      this.editdata = item;
      this.initializeFormGroup();
    });
  }


  form: FormGroup = new FormGroup({
    //$key: new FormControl(null),
    label: new FormControl('', Validators.required),
    dci: new FormControl('', Validators.required),
  });

  initializeFormGroup() {
    this.form.setValue({
      label:this.editdata.label,
      dci:this.editdata.dci
    })
    /*
    this.form.setValue({
      $key: null,
      fullName: '',
      email: '',
      mobile: '',
      city: '',
      gender: '1',
      department: 0,
      hireDate: '',
      isPermanent: false
    });*/
  }

  /*
  Reactiveform = new FormGroup({
    code: new FormControl({ value: 0, disabled: true }),
    name: new FormControl("", Validators.required),
    email: new FormControl("", Validators.required),
    phone: new FormControl("", Validators.required),
    designation: new FormControl(""),
    gender: new FormControl("M"),
    isactive: new FormControl(true)
  });*/

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
