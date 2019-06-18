import { InMemoryDbService }  from 'angular-in-memory-web-api';
import { Form } from "./form";
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root',
})

export class InMemoryDataService implements InMemoryDbService {
  //Used to create a mock database so that we can test http methods for obtaining data
  createDb() {
    const forms = [
      {
        id: '1',
        coverageType: 'STD',
        state: 'NY',
        sourceSystem: 'S',
        formType: 'Claim',
        name: 'Short-term Disability Claim Statement',
        link: 'https://www.slfserviceresources.com/forms/claims/k0384any.pdf',
        description: 'This form is used for submitting short-term disability claims',
        formId: 'k0384any',
      },
      {
        id: '2',
        coverageType: 'DENTAL',
        state: 'AK',
        sourceSystem: 'S',
        formType: 'Claim',
        name: 'Dental Claim Statement',
        link: 'https://www.slfserviceresources.com/forms/claims/k2147a.pdf',
        description: 'This form is used for submitting dental claims',
        formId: 'k2147a'
      },
      {
        id: '3',
        coverageType: 'DENTAL',
        state: 'HI',
        sourceSystem: 'S',
        formType: 'Claim',
        name: 'Dental Claim Statement',
        link: 'https://www.slfserviceresources.com/forms/claims/k2147a.pdf',
        description: 'This form is used for submitting dental claims',
        formId: 'k2147a'
      },
      {
        id: '4',
        coverageType: 'DENTAL',
        state: 'DE',
        sourceSystem: 'S',
        formType: 'Claim',
        name: 'Dental Claim Statement',
        link: 'https://www.slfserviceresources.com/forms/claims/k2147a.pdf',
        description: 'This form is used for submitting dental claims',
        formId: 'k2147a'
      },
      {
        id: '5',
        coverageType: 'LTD',
        state: 'KS',
        sourceSystem: 'S',
        formType: 'Continuance',
        name: 'Employee Application For Conversion Coverage Long-term Disability Insurance',
        link: 'https://www.slfserviceresources.com/forms/admin/k1615.pdf',
        description: 'This employee form is used when requesting conversion of your long-term disability policy.',
        formId: 'k1615'
      },
      {
        id: '6',
        coverageType: 'LTD',
        state: 'AZ',
        sourceSystem: 'S',
        formType: 'Continuance',
        name: 'Facts About Your Conversion Privilege',
        link: 'https://www.slfserviceresources.com/forms/admin/k4054e.pdf',
        description: 'This employee form is used to learn more about converting your long-term disability policy. ',
        formId: 'k4054e'
      },
      {
        id: '7',
        coverageType: 'LTD',
        state: 'AZ',
        sourceSystem: 'S',
        formType: 'Claim',
        name: 'Long-term Disability Claim Statement',
        link: 'https://www.slfserviceresources.com/forms/claims/k3283a.pdf',
        description: 'This form is used for submitting long-term disability claims.',
        formId: 'k3283a'
      },
    ];
    return {forms};
  }

  genId(forms: Form[]): number {
    return forms.length > 0 ? Math.max(...forms.map(form => form.id)) + 1 : 11;
  }

}
