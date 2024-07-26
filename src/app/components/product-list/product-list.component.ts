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
      name:"Dolyprane 1", price:"5",
    },
    {
      name:"Dolyprane", price:"6",
    },
    {
      name:"Dolyprane", price:"7",
    },
    {
      name:"Dolyprane", price:"8",
    },
    {
      name:"Paracétamol", price:"9",
    }
  ];

  ngOnInit(): void {
  }

  viewProduct() {
    console.log('View Product');
  }

}
