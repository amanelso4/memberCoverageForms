import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {
  transform(items: any[], fTypeSearch: string, covTypeSearch: string) {
    if (items && items.length) {
      return items.filter(item =>{
        if (fTypeSearch != item.formType){
          return false;
        }
        if (covTypeSearch != item.coverageType){
          return false;
        }
        return true;
      })
    }
    else {
      return items;
    }
  }
}
