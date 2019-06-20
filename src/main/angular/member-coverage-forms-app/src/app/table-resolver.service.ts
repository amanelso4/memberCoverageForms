import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Form } from "./form";
import { Observable } from "rxjs";
import { FormService } from "./form.service";

@Injectable({
  providedIn: 'root'
})
export class TableResolverService implements Resolve<Form[]> {

  constructor(
    private formService: FormService
  ) { }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Form[]> {
    return this.formService.getForms();
  }


}
