import { Product } from './product';

export class LineSold {
  id: number;
  productId: number;
  quantiteVendu: number;
  totalAmount: number;
  constructor(productId: number, quantiteVendu: number, totalAmount: number) {
    this.productId = productId;
    this.quantiteVendu = quantiteVendu;
    this.totalAmount = totalAmount;
  }
}
