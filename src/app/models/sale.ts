import { LineSold } from './line-sold';

export class Sale {
  id: number;
  lineSoldDtos:Array<LineSold>;
  dateSale: String;
  totalAmount:number;
  typePayment: String;
  idClient: number;
  constructor(lineSoldDtos:Array<LineSold>, dateSale: String, totalAmount:number, typePayment: String,  idClient: number) {
    this.lineSoldDtos = lineSoldDtos;
    this.dateSale = dateSale;
    this.totalAmount = totalAmount;
    this.typePayment = typePayment;
    this.idClient = idClient;
  }
}
