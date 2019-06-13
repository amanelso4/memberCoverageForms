//
//
// No longer relevant, functionality moved to in-memory-data service
//
//

import {Form} from '../app/form';
import { FormInt } from "./formInt";

export const MOCKFORMS: FormInt[] = [
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
    state: 'AZ',
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

/*export const MOCKFORMS: Form[] = [
  {
    ci : 'STD',
    fhf : true,
    fl : [
      {
        ds : 'Short-term Disability Claim Statement',
        fl : 'https://www.slfserviceresources.com/forms/claims/k0384any.pdf',
        ft : 'Claim',
        fill : true,
        fh : 'This form is used for submitting short-term disability claims. ',
        fc : 'k0384any'
      },
      {
        ds : 'Short-term Disability Claim Statement',
        fl : 'https://www.slfserviceresources.com/forms/claims/k0384any.pdf',
        ft : 'Claim',
        fill : true,
        fh : 'This form is used for submitting short-term disability claims. ',
        fc : 'k0384any'
      },
      {
        ds : 'Short-term Disability Claim Statement',
        fl : 'https://www.slfserviceresources.com/forms/claims/k0384any.pdf',
        ft : 'Claim',
        fill : true,
        fh : 'This form is used for submitting short-term disability claims. ',
        fc : 'k0384any'
      }
    ],
    sc : 'NY',
    ss : 'S'
  },
  {
    ci : 'DENTAL',
    fhf : true,
    fl : [
      {
        ds : 'Dental Claim Statement',
        fl : 'https://www.slfserviceresources.com/forms/claims/k2147a.pdf',
        ft : 'Claim',
        fill : true,
        fh : 'This form is used for submitting dental claims',
        fc : 'k2147'
      }
    ],
    sc : 'AK',
    ss : 'S'
  },
  {
    ci : 'DENTAL',
    fhf : true,
    fl : [
      {
        ds : 'Dental Claim Statement',
        fl : 'https://www.slfserviceresources.com/forms/claims/k2147a.pdf',
        ft : 'Claim',
        fill : true,
        fh : 'This form is used for submitting dental claims',
        fc : 'k2147'
      }
    ],
    sc : 'HI',
    ss : 'S'
  },
  {
    ci : 'DENTAL',
    fhf : true,
    fl : [
      {
        ds : 'Dental Claim Statement',
        fl : 'https://www.slfserviceresources.com/forms/claims/k2147a.pdf',
        ft : 'Claim',
        fill : true,
        fh : 'This form is used for submitting dental claims',
        fc : 'k2147'
      }
    ],
    sc : 'DE',
    ss : 'S'
  },
  {
    ci : 'LTD',
    fhf : true,
    fl : [
      {
        ds : 'Employee Application For Conversion Coverage Long-term Disability Insurance',
        fl : 'https://www.slfserviceresources.com/forms/admin/k1615.pdf',
        ft : 'Continuance',
        fill : false,
        fh : 'This employee form is used when requesting conversion of your long-term disability policy. ',
        fc : 'k1615'
      },
      {
        ds : 'Facts About Your Conversion Privilege',
        fl : 'https://www.slfserviceresources.com/forms/admin/k4054e.pdf',
        ft : 'Continuance',
        fill : false,
        fh : 'This employee form is used to learn more about converting your long-term disability policy. ',
        fc : 'k4054e'
      },
      {
        ds : 'Long-term Disability Claim Statement',
        fl : 'https://www.slfserviceresources.com/forms/claims/k3283a.pdf',
        ft : 'Claim',
        fill : true,
        fh : 'This form is used for submitting long-term disability claims.',
        fc : 'k3283a'
      },
      {
        ds : 'Long-term Disability Claim Statement - Conversion',
        fl : 'https://www.slfserviceresources.com/forms/claims/k3283p.pdf',
        ft : 'Claim',
        fill : false,
        fh : 'This form is used for submitting long-term disability conversion claims.',
        fc : 'k3283p'
      },
      {
        ds : 'Supplementary Report for Benefits',
        fl : 'https://www.slfserviceresources.com/forms/claims/k2180a.pdf',
        ft : 'Claim',
        fill : false,
        fh : 'This form is used for long-term disability claims.',
        fc : 'k2180a'
      }
    ],
    sc : 'AZ',
    ss : 'S'
  }
];*/
