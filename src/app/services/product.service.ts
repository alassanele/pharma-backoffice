import { Injectable } from '@angular/core';

import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private products:Product[] = [
    {
      id: 1,
      label: "REMDESIVIR 100 mg, pdr pr sol à diluer pr perf",
      dci:"REMDESIVIR",
      sectionPrice: "25",
      publicPrice:"35",
      cip: "3400958902208",
      ucd:"3400890004800",
      tva: "10",
      quantiteStock: 1
    },
    {
      id: 2,
      label: "REMDESIVIR 100 mg/20 mL, sol à diluer pr perf, flac",
      dci:"REMDESIVIR",
      sectionPrice: "20",
      publicPrice:"30",
      cip: "3400958902192",
      ucd:"3400890004817",
      tva: "10",
      quantiteStock: 3
    },
    {
      id: 3,
      label: "VEKLURY 100 mg, pdr pr sol à diluer pr perf",
      dci:"REMDESIVIR",
      sectionPrice: "40",
      publicPrice:"50",
      cip: "3400955074267",
      ucd:"3400890007153",
      tva: "10",
      quantiteStock: 9
    },
    {
      id: 4,
      label: "PARACETAMOL 1 000 mg/100 mL CARELIDE, sol pr perf, poche avec site d'inj",
      dci:"PARACETAMOL",
      sectionPrice: "45",
      publicPrice:"55",
      cip: "3400957689582",
      ucd:"3400893506585",
      tva: "10",
      quantiteStock: 12
    },
    {
      id: 5,
      label: "PARACETAMOL 1 000 mg/100 mL CARELIDE, sol pr perf, poche avec site d'inj + set",
      dci:"PARACETAMOL",
      sectionPrice: "60",
      publicPrice:"85",
      cip: "3400957690762 ; 3400957691073",
      ucd:"3400893506646",
      tva: "10",
      quantiteStock: 15
    },
    {
      id: 6,
      label: "PARACETAMOL 1 000 mg/100 mL CARELIDE, sol pr perf, poche avec site d'inj + set",
      dci:"PARACETAMOL",
      sectionPrice: "60",
      publicPrice:"85",
      cip: "3400957690762 ; 3400957691073",
      ucd:"3400893506646",
      tva: "10",
      quantiteStock: 15
    }
  ];

  constructor() { }

  getProducts(): Product[] {
    return this.products;
    //return this.http.get<Product[]>(this.urlApi);
  }

  /*
  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.urlApi);
  }*/

  editProduct(idProduct: number)  {

  }

  addProduct(product: Product)  {

  }

  deleteProduct(idProduct: number) {

  }

}
