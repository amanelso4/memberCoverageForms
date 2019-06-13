import { InMemoryDbService }  from 'angular-in-memory-web-api';

export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const forms = [
      {
        coverageType: 'STD',
        state: 'NY',
        sourceSystem: 'S',
        formType: 'Claim',
        name: 'Short-term Disability Claim Statement',
        link: 'https://www.slfserviceresources.com/forms/claims/k0384any.pdf',
        description: 'This form is used for submitting short-term disability claims'
      },
      {
        coverageType: 'DENTAL',
        state: 'AK',
        sourceSystem: 'S',
        formType: 'Claim',
        name: 'Dental Claim Statement',
        link: 'https://www.slfserviceresources.com/forms/claims/k2147a.pdf',
        description: 'This form is used for submitting dental claims'
      },
      {
        coverageType: 'DENTAL',
        state: 'HI',
        sourceSystem: 'S',
        formType: 'Claim',
        name: 'Dental Claim Statement',
        link: 'https://www.slfserviceresources.com/forms/claims/k2147a.pdf',
        description: 'This form is used for submitting dental claims'
      },
      {
        coverageType: 'DENTAL',
        state: 'DE',
        sourceSystem: 'S',
        formType: 'Claim',
        name: 'Dental Claim Statement',
        link: 'https://www.slfserviceresources.com/forms/claims/k2147a.pdf',
        description: 'This form is used for submitting dental claims'
      },
      {
        coverageType: 'LTD',
        state: 'KS',
        sourceSystem: 'S',
        formType: 'Continuance',
        name: 'Employee Application For Conversion Coverage Long-term Disability Insurance',
        link: 'https://www.slfserviceresources.com/forms/admin/k1615.pdf',
        description: 'This employee form is used when requesting conversion of your long-term disability policy. '
      },
      {
        coverageType: 'LTD',
        state: 'AZ',
        sourceSystem: 'S',
        formType: 'Continuance',
        name: 'Facts About Your Conversion Privilege',
        link: 'https://www.slfserviceresources.com/forms/admin/k4054e.pdf',
        description: 'This employee form is used to learn more about converting your long-term disability policy. '
      },
      {
        coverageType: 'LTD',
        state: 'AZ',
        sourceSystem: 'S',
        formType: 'Claim',
        name: 'Long-term Disability Claim Statement',
        link: 'https://www.slfserviceresources.com/forms/claims/k3283a.pdf',
        description: 'This form is used for submitting long-term disability claims.'
      },
    ];
    return {forms};
  }

}
