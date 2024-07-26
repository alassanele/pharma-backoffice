import { Component, OnInit } from '@angular/core';

import { Product } from '../../models/product';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent implements OnInit{

  products:Product[] = [
    {
      name:"Dolyprane", price:"10",
    },
    {
      name:"Paracétamol", price:"20",
    }
  ];

  ngOnInit(): void {
  }

  viewProduct() {
    console.log('View Product');
  }

}
