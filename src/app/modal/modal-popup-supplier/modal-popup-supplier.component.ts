import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SupplierService } from './../../services/supplier.service';
//import * as alertify from 'alertifyjs'
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-popup-supplier',
  templateUrl: './modal-popup-supplier.component.html',
  styleUrl: './modal-popup-supplier.component.css'
})
export class ModalPopupSupplierComponent  implements OnInit {

  constructor(private supplierService: SupplierService, public dialogref: MatDialogRef<ModalPopupSupplierComponent>,@Inject(MAT_DIALOG_DATA) public data:any) { }

  suppliers: any;
  respdata: any;
  editdata: any;

  title:String = "Ajouter un fournisseur";

  ngOnInit(): void {
    this.loadSuppliers();
    if(this.data.id!=null && this.data.id!=''){
      this.loadEditSupplier(this.data.id);
      this.title = "Modifier un fournisseur";
    }
  }

  loadSuppliers() {
    this.supplierService.getSuppliers().subscribe(result => {
      this.suppliers = result;
    });
  }

  loadEditSupplier(idSupplier: any) {
    this.supplierService.editSupplier(idSupplier).subscribe(item => {
      this.editdata = item;
      console.log(this.editdata);
      this.initializeFormGroup();
    });
  }


  form: FormGroup = new FormGroup({
    id: new FormControl(null),
    name: new FormControl('', Validators.required),
    address: new FormControl('', Validators.required),
    numberPhone: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required)
  });

  initializeFormGroup() {
    this.form.setValue({
      id:this.editdata.id,
      name:this.editdata.name,
      address:this.editdata.address,
      numberPhone:this.editdata.numberPhone,
      email:this.editdata.email
    });
  }

  saveSupplier() {
    if (this.form.valid) {
      this.supplierService.addSupplier( this.form.value).subscribe(result => {
        this.respdata = result;
        //alertify.success("saved successfully.")
        this.dialogref.close();
      });
    } else {
      //alertify.error("Please Enter valid data")
    }
  }

}
