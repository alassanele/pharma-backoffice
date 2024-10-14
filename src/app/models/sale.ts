import { LineSold } from './line-sold';

export class Sale {
  id: number;
  lineSoldDtos:Array<LineSold>;
  dateSale: String;
  totalAmount:number
  constructor(lineSoldDtos:Array<LineSold>, dateSale: String, totalAmount:number) {
    this.lineSoldDtos = lineSoldDtos;
    this.dateSale = dateSale;
    this.totalAmount = totalAmount;
  }
}
