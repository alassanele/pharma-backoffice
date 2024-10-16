import { LineCommand } from './line-command';

export class Command {
  id: number;
  lineCommands:Array<LineCommand>;
  commandDate: String;
  supplierId: number;
  totalAmount:number
  constructor(lineCommands:Array<LineCommand>, commandDate: String, supplierId: number, totalAmount:number) {
    this.lineCommands = lineCommands;
    this.commandDate = commandDate;
    this.supplierId = supplierId;
    this.totalAmount = totalAmount;
  }
}
