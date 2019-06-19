import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Form } from "./form";
import { Observable } from "rxjs";
import { TableHelperService } from "./table-helper.service";

@Injectable({
  providedIn: 'root'
})
export class TableResolverService implements Resolve<Form[]> {

  constructor(
    private tableHelper: TableHelperService
  ) { }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Form[]> {
    return this.tableHelper.getForms();
  }


}
