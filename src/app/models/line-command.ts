import { Product } from './product';

export class LineCommand {
  id: number;
  //product:Product;
  productId: number;
  quantity: number;
  totalAmount: number;
  constructor(productId: number, quantity: number, totalAmount: number) {
    this.productId = productId;
    this.quantity = quantity;
    this.totalAmount = totalAmount;
  }
}
