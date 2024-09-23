import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'currencyXof'
})
export class CurrencyXofPipe implements PipeTransform {

  transform(value: number, showSymbol: boolean = true): string {
    if (isNaN(value)) {
      return '';
    }

    // Format number with spaces for thousands
    const formattedValue = new Intl.NumberFormat('fr-FR').format(value);

    // Return with or without the symbol "XOF"
    return showSymbol ? `${formattedValue} XOF` : formattedValue;
  }
}
