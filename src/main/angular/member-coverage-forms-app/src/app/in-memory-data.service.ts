import { InMemoryDbService }  from 'angular-in-memory-web-api';
import { Form } from "./form.service";
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root',
})

export class InMemoryDataService implements InMemoryDbService {
  //Used to create a mock database so that we can test http methods for obtaining data
  createDb() {
    const forms = [ //Maybe make this a Form[] object?
      {
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
        coverageType: 'LTD',
        state: 'AZ',
        sourceSystem: 'S',
        formType: 'Claim',
        name: 'Long-term Disability Claim Statement',
        link: 'https://www.slfserviceresources.com/forms/claims/k3283a.pdf',
        description: 'This form is used for submitting long-term disability claims.',
        formId: 'k3283a'
      },
      {
        coverageType: 'GAP',
        state: 'MD',
        sourceSystem: 'S',
        formType: 'Claim',
        name: 'Hospital Confinement Indemnity',
        link: 'https://www.slfserviceresources.com/forms/claims/kc4739fsl.pdf',
        description: 'This form is used for submitting an initial hospital confinement indemnity',
        formId: 'kc4739fsl'
      },
      {
        coverageType: 'LTD',
        state: 'DE',
        sourceSystem: 'S',
        formType: 'Claim',
        name: 'Long-term Disability Claim Statement',
        link: 'https://www.slfserviceresources.com/forms/claims/k3283a.pdf',
        description: 'This form is used for submitting long-term disability claims.',
        formId: 'k3283a'
      },
      {
        coverageType: 'LTD',
        state: 'DE',
        sourceSystem: 'S',
        formType: 'Claim',
        name: 'Long-term Disability Claim Statement - Conversion',
        link: 'https://www.slfserviceresources.com/forms/claims/k3283p.pdf',
        description: 'This form is used for submitting long-term disability conversion claims.',
        formId: 'k3283p'
      },
      {
        coverageType: 'GAP',
        state: 'AR',
        sourceSystem: 'S',
        formType: 'Claim',
        name: 'Hospital Confinement Indemnity',
        link: 'https://www.slfserviceresources.com/forms/claims/kc4739fsl.pdf',
        description: 'This form is used for submitting an initial hospital confinement indemnity',
        formId: 'kc4739fsl'
      },
      {
        coverageType: 'LTD',
        state: 'SD',
        sourceSystem: 'S',
        formType: 'Continuance',
        name: 'Long-term Disability Claim Statement',
        link: 'https://www.slfserviceresources.com/forms/admin/k1615.pdf',
        description: 'This employee form is used when requesting conversion of your long-term disability policy.',
        formId: 'k1615'
      },
      {
        coverageType: 'GAP',
        state: 'KY',
        sourceSystem: 'S',
        formType: 'Claim',
        name: 'Hospital Confinement Indemnity',
        link: 'https://www.slfserviceresources.com/forms/claims/kc4739fsl.pdf',
        description: 'This form is used for submitting an initial hospital confinement indemnity',
        formId: 'kc4739fsl'
      },
      {
        coverageType: 'LTD',
        state: 'AZ',
        sourceSystem: 'S',
        formType: 'Claim',
        name: 'Long-term Disability Claim Statement',
        link: 'https://www.slfserviceresources.com/forms/claims/k3283a.pdf',
        description: 'This form is used for submitting long-term disability claims.',
        formId: 'k3283a'
      },
      {
        coverageType: 'DENTALPREPAID',
        state: 'AZ',
        sourceSystem: 'S',
        formType: 'Claim',
        name: 'Dental Prepaid Claim Statement',
        link: 'https://www.slfserviceresources.com/forms/claims/k2147l.pdf',
        description: 'This form is used for submitting dental claims',
        formId: 'k2147l'
      },
      {
        coverageType: 'DENTALPREPAID',
        state: 'AK',
        sourceSystem: 'S',
        formType: 'Claim',
        name: 'Dental Prepaid Claim Statement',
        link: 'https://www.slfserviceresources.com/forms/claims/k2147l.pdf',
        description: 'This form is used for submitting dental claims',
        formId: 'k2147l'
      },
      {
        coverageType: 'CRITICALILLNESS',
        state: 'IN',
        sourceSystem: 'Q',
        formType: 'Claim',
        name: 'Employee Paid Supplemental Claim',
        link: 'https://www.slfserviceresources.com/forms/claims/k4700.pdf',
        description: 'This form is used when submitting additional documents after the initial claim statement has been sent.',
        formId: 'k4700'
      },
      {
        coverageType: 'CRITICALILLNESS',
        state: 'IN',
        sourceSystem: 'Q',
        formType: 'Claim',
        name: 'Employee Paid Supplemental Claim (Spanish)',
        link: 'https://www.slfserviceresources.com/forms/claims/KC4700-S.pdf',
        description: 'This form is used when submitting additional documents after the initial claim statement has been sent.',
        formId: 'KC4700-S'
      },
      {
        coverageType: 'CRITICALILLNESS',
        state: 'IN',
        sourceSystem: 'Q',
        formType: 'Claim',
        name: 'Critical Illness Claim Statement',
        link: 'https://www.slfserviceresources.com/forms/claims/k4678.pdf',
        description: 'This form is used for submitting an initial critical illness claim.',
        formId: 'k4678'
      },
      {
        coverageType: 'LTD',
        state: 'AZ',
        sourceSystem: 'Q',
        formType: 'Claim',
        name: 'Employee Paid Supplemental Claim',
        link: 'https://www.slfserviceresources.com/forms/claims/k4700.pdf',
        description: 'This form is used when submitting additional documents after the initial claim statement has been sent.',
        formId: 'k4700'
      },
    ];
    return {forms};
  }
}
