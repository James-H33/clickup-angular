import { Pipe } from "@angular/core";
import { Nullable } from "@common/types/nullable";

@Pipe({
  name: 'firstChar',
})
export class FirstCharPipe {
  transform(value: Nullable<string>): string {
    if (!value) {
      return '';
    }
    return value.charAt(0).toUpperCase();
  }
}
