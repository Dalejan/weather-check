/**
 * icon-name.pipe.ts
 * Archivo que maneja el pipe para tratar el nombre de los iconos de clima
 */
import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "iconName"
})

/**
 * IconNamePipe
 * Pipe encargada de retornar el nombre del icono para se usado por ngx-skycons
 */
export class IconNamePipe implements PipeTransform {
  transform(value: any, ...args: any[]): any {
    return value.replace("-", " ");
  }
}
