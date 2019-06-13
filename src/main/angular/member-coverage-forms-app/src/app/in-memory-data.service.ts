import { InMemoryDbService }  from 'angular-in-memory-web-api';

export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const forms = [
      {
        coverageType: 'Dental', state: 'KS', sourceSystem: 'VBS', formType: 'HelloWorld', name: 'AngularPro',
        link: 'www.HelloAngular.com', description: 'I love sea turtles'
      },
      {
        coverageType: 'Dental', state: 'KS', sourceSystem: 'VBS', formType: 'HelloWorld', name: 'AngularNo',
        link: 'www.HelloAngular.com', description: 'I love sea turtles'
      },
      {
        coverageType: 'Dental', state: 'KS', sourceSystem: 'VBS', formType: 'HelloWorld', name: 'AngularAngry',
        link: 'www.HelloAngular.com', description: 'I love sea turtles'
      }
    ];
    return {forms};
  }

}
