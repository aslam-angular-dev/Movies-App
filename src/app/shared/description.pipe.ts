import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'description'
})
export class DescriptionPipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): unknown {

    if (value.length > 200) {
      value = value.substring(0, 199);
      if (value[value.length - 1] !== '.') {
        value += "..."
      }
    }
    return value;
  }

}
