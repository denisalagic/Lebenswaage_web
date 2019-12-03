export class CodebookModel {

  constructor(public id: number,
              public code: string,
              public name: string,
              public nameDE: string,
              public nameHR: string,
              public notes: string,
              public files: any[]) {}
}

