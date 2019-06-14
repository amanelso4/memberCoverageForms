import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {
  transform(items: any[], fTypeSearch: string, covTypeSearch: string, stateSearch: string[], nameSearch: string, descSearch: string, linkSearch: string) {
    if (items && items.length) {
      return items.filter(item =>{
        if (fTypeSearch && fTypeSearch != item.formType){
          return false;
        }
        else if (covTypeSearch && covTypeSearch != item.coverageType){
          return false;
        }
        else if ((stateSearch.length > 0) && !stateSearch.includes(item.state)){
          return false;
        }
        else if (nameSearch && item.name.toLowerCase().indexOf(nameSearch.toLowerCase()) === -1){
          return false;
        }
        else if (descSearch && item.description.toLowerCase().indexOf(descSearch.toLowerCase()) === -1){
          return false;
        }
        else if (linkSearch && item.link.toLowerCase().indexOf(linkSearch.toLowerCase()) === -1){
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
