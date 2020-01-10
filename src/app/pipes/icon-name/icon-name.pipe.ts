import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "iconName"
})
export class IconNamePipe implements PipeTransform {
  transform(value: any, ...args: any[]): any {
    return value.replace("-", " ");
  }
}
