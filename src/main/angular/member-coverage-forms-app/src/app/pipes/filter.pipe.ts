import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {
  //Uses provided search values to filter out form values that do not fit
  //If search value is empty string, it does not apply filter
  transform(items: any[], fTypeSearch: string, covTypeSearch: string, stateSearch: string, sourceSearch: string, idSearch: string, nameSearch: string) {
    if (items && items.length) {
      return items.filter(item =>{
        if (fTypeSearch && fTypeSearch != item.formType){
          return false;
        }
        else if (covTypeSearch && covTypeSearch != item.coverageType){
          return false;
        }
        else if (stateSearch && item.state.indexOf(stateSearch) === -1){
          return false;
        }
        else if (nameSearch && item.name.toLowerCase().indexOf(nameSearch.toLowerCase()) === -1){
          return false;
        }
        else if (sourceSearch && item.sourceSystem != sourceSearch){
          return false;
        }
        else if (idSearch && item.formId.toLowerCase().indexOf(idSearch.toLowerCase()) === -1){
          return false;
        }
        return true;
      }).sort(function(a, b) {
        if (a.formType != b.formType) {
          return a.formType < b.formType ? -1 : 1;
        } else if (a.coverageType != b.coverageType) {
          return a.coverageType < b.coverageType ? -1 : 1;
        } else {
          return a.name < b.name ? -1 : 1;
        }
      })
    }
    else {
      return items;
    }
  }
}
