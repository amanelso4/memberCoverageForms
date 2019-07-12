import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: 'filter'
})

// Takes in search field values from table component and returns a filtered version of the form array
export class FilterPipe implements PipeTransform {
  transform(items: any[], fTypeSearch: string, covTypeSearch: string, stateSearch: string, sourceSearch: string, numberSearch: string, nameSearch: string) {
    if (items && items.length) {
      items = items.filter(item =>{
        // only applies each filter if the search value is not an empty string
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
        else if (numberSearch && item.formNumber.toLowerCase().indexOf(numberSearch.toLowerCase()) === -1){
          return false;
        }
        return true;
      }).sort(function(a, b) {
        // sorts forms alphabetically by form type, then coverage type, then form name
        // this is applied regardless of whether or not they've searched for something
        if (a.formType != b.formType) {
          return a.formType < b.formType ? -1 : 1;
        } else if (a.coverageType != b.coverageType) {
          return a.coverageType < b.coverageType ? -1 : 1;
        } else {
          return a.name < b.name ? -1 : 1;
        }
      });
      // if no items are returned, there are no matching forms for their search strings
      // push the ERROR form to the items array and return it (handled in table.component.html)
      if (items == undefined) {
        console.log("empty");
        items = [{"formType":"ERROR", "state":[]}];
      } else if (items.length == 0) {
        items.push({"formType":"ERROR", "state":[]});
      }
    return items;
    }
    // just return items if it's empty
    else {
      return items;
    }
  }
}
