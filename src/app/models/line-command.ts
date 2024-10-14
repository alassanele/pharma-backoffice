export class LineCommand {
  id: number;
  productId: number;
  quantity: number;
  totalAmount: number;
  constructor(productId: number, quantity: number, totalAmount: number) {
    this.productId = productId;
    this.quantity = quantity;
    this.totalAmount = totalAmount;
  }
}
