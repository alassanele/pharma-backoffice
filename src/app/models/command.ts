import { LineCommand } from './line-command';
import { Supplier } from './supplier';

export class Command {
  id: number;
  lineCommands:Array<LineCommand>;
  commandDate: String;
  supplierId: number;
  //supplier: Supplier;
}
