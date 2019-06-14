//Interface used by app components for interacting with form objects
export interface FormInt {
  id: number;
  coverageType: string;
  state: string;
  sourceSystem: string;
  formType: string;
  name: string;
  link: string;
  description: string;
}
