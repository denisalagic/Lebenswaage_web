export class CodebookModel {

  constructor(public id: number,
              public code: string,
              public name: string,
              public notes: string,
              public files: string[]) {}
}

